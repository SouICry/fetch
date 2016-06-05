/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;
    
	var util = {

        // generate a hash code for the item
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},

        //this will change 'item' to 'items' if more than one element in list
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},

        // so this is where you would get the json data for the list
        // how do I show all the items in list from first screen? for driver.
		store: function (namespace, data) {
            console.log("STORE FUNCTION:");
			if (arguments.length > 1) {
                console.log("\tfrom if: = jSON.stringfy(data)", JSON.stringify(data));
                console.log(JSON.parse(data));
                //console.log("\tfrom if: store=", store);
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
                console.log("\tfrom else, store=", store);
                console.log("\tfrom else: JSON.parse(store))=", JSON.parse(store));
				return (store && JSON.parse(store)) || [];
			}
		}

	};


    // This is the shopping list object
	var App = {
        
        //this i believe inititalizes the todo list
		init: function () {
            //todos is an array of all the shopping items;
            console.log("INIT function:");

            //what is todos-jquery?
            this.todos = util.store('todos-jquery');
            console.log("\tthis.todos=", this.todos);

            this.todoTemplate = Handlebars.compile($('.todo-template').html());
            this.footerTemplate = Handlebars.compile($('.footer-template').html());

            this.bindEvents();
            // this will automatically display the saved contents of list
            this.render();
            
            // if(window.location.hash == "#drive")
            // {
            //     this.todoTemplate = Handlebars.compile($('.todo-template').html());
            //     this.footerTemplate = Handlebars.compile($('.footer-template').html());
            //
            //     this.bindEvents();
            //
            //     // this will automatically display the saved contents of list
            //     this.render();
            // }
            //
            // else if(window.location.hash == "#shop")
            // {
            //     this.todoTemplate = Handlebars.compile($('.todo-template').html());
            //     this.footerTemplate = Handlebars.compile($('.footer-template2').html());
            //
            //     this.bindEvents();
            //
            //     // this will automatically display the saved contents of list
            //     this.render();
            // }

		},

        // this will envoke certain functions on key press... I think?
		bindEvents: function () {
			$('#new-todo').on('keyup', this.create.bind(this));
			$('#toggle-all').on('change', this.toggleAll.bind(this));
			$('.footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
			$('.todo-list')
                // The toggle() method toggles between hide() and show() for the selected elements.
                .on('change', '.toggle', this.toggle.bind(this))
				.on('dblclick', 'label', this.edit.bind(this))
				.on('keyup', '.edit', this.editKeyup.bind(this))
				.on('focusout', '.edit', this.update.bind(this))
				.on('click', '.destroy', this.destroy.bind(this));
		},

        //this will update the todo list
		render: function () {
            console.log("RENDER FUNC:");
            console.log("\tthis=" ,this);
			var todos = this.getFilteredTodos();
            console.log("\ttodos: =" ,todos);

            // // try and hide toggle button if has = shop
            // console.log("hash: ", window.location.hash);

            //this is where the html get rendered to the the page
			$('.todo-list').html(this.todoTemplate(todos));


			$('.main').toggle(todos.length > 0);
			$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
			this.renderFooter();
			$('#new-todo').focus();
			util.store('todos-jquery', this.todos);

            //remove toggle buttons from shop page
            if(window.location.hash == "#shop") {
                console.log("turn off toggle if in shop");
                $('.toggle').addClass('hidden');
                // $('.filters').addClass('hidden');
                renderShopperPage();
            }

            // add toggle buttons to Driver page
            else if(window.location.hash == "#drive") {
                console.log("turn on toggle if in drive");
                $('.toggle').removeClass('hidden');
                renderDriverPage();
            }

            // update console with current todo list
            console.log("\t this.todos:",this.todos);
		},

        //this update the list Count
		renderFooter: function () {
            console.log("RENDErFOOTER:");
            console.log("\tthis.todos=", this.todos.length);
			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			$('.footer').toggle(todoCount > 0).html(template);
		},
		toggleAll: function (e) {
            // prop() adds property
			var isChecked = $(e.target).prop('checked');

			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			this.render();
		},
		getActiveTodos: function () {
			return this.todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
		},
		getFilteredTodos: function () {
			if (this.filter === 'active') {
				return this.getActiveTodos();
			}

			if (this.filter === 'completed') {
				return this.getCompletedTodos();
			}

			return this.todos;
		},
		destroyCompleted: function () {
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},

		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
        // 'el' is the element that recieved the event such as a click
		indexFromEl: function (el) {
            var id = $(el).closest('li').data('id');
            console.log("indexFromEl: var id=", id);
			var todos = this.todos;

            // get the number of item that clicked
			var i = todos.length;
            console.log("indexFromEl: var i =", i);

            // find the corresponding element in array and return its index
			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
        // 'e.target' is the element that got the event like a click, or keypress
        // e = the event , in this case its 'keyUp'
        // the create function is triggered with every key press in input form
		create: function (e) {
            //console.log("in create Func: ");
            //console.log("e.target=",e.target);
            //console.log("e=",e);
			var $input = $(e.target);

            // get the keys that were just typed
			var val = $input.val().trim();

            // e.which = the numerical value of the key that was just pressed
            // !val  returns true if no keys were pressed

            // console output
            //console.log("!val=",!val);
            //console.log("e.which != Enter_key =" ,e.which!== ENTER_KEY);

            // don't do anything if a button was pressed that wasn't the enter key
            // or it was the enter key but no item was entered
			if (e.which !== ENTER_KEY || !val) {
				return;
			}

            // push element into shopping list array (todo)
            // assigning its id to be generated hashcode
            // title to be the actually shopping item
            // and the completed flag to be false
			this.todos.push({
				id: util.uuid(),
				title: val,
				completed: false
			});

			$input.val('');

			this.render();
		},

		toggle: function (e) {
            console.log("from toggle Func: ");
			var i = this.indexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.render();
		},

        // edit function is called when double click an item
		edit: function (e) {
            console.log("editFunc");
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
            console.log($input);
			$input.val($input.val()).focus();
		},

        // this is called everytime a key is pressed while editing an itme
		editKeyup: function (e) {
            console.log("editKeyup func: ");
			if (e.which === ENTER_KEY) {

                //remove focus from element
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
		},

        // assume this updates the shopping list
        // called when you press enter after editing an shopping item
		update: function (e) {
            console.log("from update, var el = e.targter: = ", e.target);
			var el = e.target;
			var $el = $(el);
            // this will display the object that invoked the action?
            console.log("from update, var $el=", $el);
			var val = $el.val().trim();
            console.log("from update: el.val.trim =", val);

            //this will remove the element if it is deleted
            //from the edit view
			if (!val) {
				this.destroy(e);
                // output the modified shopping list
                console.log("from update: " , this);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos[this.indexFromEl(el)].title = val;
			}

            // what does this do again?
            // remember that 'this' is the entire shopping list object
            //console.log("this=", this);
			this.render();
		},

        //this will delete a selected element
		destroy: function (e) {
            // this.indexFromEl(e.target) == the index of the element to be deleted
            console.log("From destroy method: ",this.indexFromEl(e.target));
			this.todos.splice(this.indexFromEl(e.target), 1);
			this.render();
		}
        
	};

	App.init();
});
