var master = {

};



function createTicket(userId) {
    var user = loadUser(userId);

    if (user === null) {
        console.log("User does not exist");
        return;
    }
    
    var ticket = {
        id:user.id + 'ticket' + (user.grocery_list.length + 1).toString(),
        state:'pending',
        user: {
            id: user.id,
            contact: {
                phone_number: user.phone_number,
                address: {
                    street: user.address.street,
                    city: user.address.city,
                    state: user.address.state,
                    zip: user.address.zip
                }
            },
            rating: user.avg_rating
        },
        driver: {
            id: "",
            contact: {
                phone_number: ""
            }
        },
        grocery_list: {
            store_name: master.shopping_list.store_name,
            shopping_list: master.shopping_list.list,
            timestamp: master.shopping_list.timestamp,

        },
        options: {
            special_instruction: master.checkout.special_instruction,
            ava_time_1: master.checkout.time1,
            ava_time_2: master.checkout.time2
        },
        driver_list: {
            checkoff_list: [],
            time_accepted: ''
        }
    };
    saveTicket(ticket);
    return ticket;

}

function loadTickets(userId) {
    var user = loadUser(userId);
    var tickets = user.tickets;
    return tickets;
}
function saveTicket(ticket) {
    db.users.update({id: master.userId}, {$push:{tickets: ticket }});
    

}


function loadUser(userId) {
    var user = db.users.find({_id: userID});
    return user;
}

function getQueue() {
    var queue = db.queue;
    return queue;
};

function addToQueue(ticketId) {
    
};

function removeFromQueue(ticketId) {};


