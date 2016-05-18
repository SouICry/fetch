

var loader = {

    user: {
        isLoggedIn: false,
        id:""
    },
    ticket : {
        id : "",
        price: 5
    },


    //Separate loading
    loadAbove: function(){

    },
    deleteAbove: function(){
        if (this.onReturnBelow != null){
            this.onReturnBelow();
            this.onReturnBelow = null;
        }
    },
    onReturnBelow: null,
    loadedPages: ["homePage"],
    currentPage : "homePage",
    //One at a time
    next : function(param){

    },
    previous : function(param){

    },
    //All pages
    loadPages: function(){

    },
    deletePages: function(){

    },



};

