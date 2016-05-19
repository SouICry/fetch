var ticketState = {
    draft: "draft",
    queued: "queued",
    selected: "selected",
    approved: "approved",
    shopping: "shopping",
    checkout: "checkout",
    complete: "complete"
};

var ticketOption = {
    cheapest: "cheapest",
    expensive: "expensive",
    nothing: "nothing"
};

var loader = {
    user: {
        isLoggedIn: false,
        isDriver: false,
        id: "",
        tickets: []
    },
    ticket: {
        id: "",
        state: ticketState.draft,
        price: 5,
        option: ticketOption.cheapest,
        availableTimes: {}
    },
    loadAbove: function () {

    },
    deleteAbove: function () {
        if (this.onReturnBelow != null) {
            this.onReturnBelow();
            this.onReturnBelow = null;
        }
    },
    onReturnBelow: null,
    loadedPages: {},
    currentPage: "homePage",
    //One at a time
    next: function (param) {

    },
    previous: function (param) {

    },
    //All pages
    loadPages: function () {

    },
    deletePages: function () {

    },
    init: function () {

        $.ajax({
            type: "GET",
            url: "_signUp.html",
            success: function (data) {
                alert(data);
                this.loadedPages.signUp = document.createElement("div");
                $(this.loadedPages.signUp).html(data);
            }
        });

    }
};



