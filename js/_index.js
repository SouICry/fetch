/**
 * Created by zeusn_000 on 5/21/2016.
 */
(function() {
    loader._index = {
        data: "", //Optional
        version: 0, //Must be 0
        getData: function () { //must be null if not needed
            return;
        },
        loadData: function(data){
            if(data != "none") {
                document.getElementById("index_user-name").innerHTML = data.full_name;
            }
            else{
                document.getElementById("index_user-name").innerHTML = "error";
            }
        },
    };
    var allSections = ['abovePages', 'createTicket', /*'acceptTicket',*/ 'confirmTicket', 'driverFlow'];

    var all = ["_accSetting", "_contact", "_history", "_passwordRecovery", "_homePage", "_shopping", "_checkout", "_login",
        "_rating", "_passwordReset", "_signUp", "_tickets", "_driverList2", '_congrats', "_yourDeliveries"];

    var allGlyphs = ["glyphicon glyphicon-cog", "", "", "glyphicon glyphicon-wrench", "glyphicon glyphicon-home",
        "", "glyphicon glyphicon-check", "glyphicon glyphicon-log-in", "glyphicon glyphicon-signal",
        "glyphicon glyphicon-repeat",
        "glyphicon glyphicon-plus-sign", "", "", ""];

    var pageNames = ["Setting", "Contact", "History", "Password Recovery", "Home", "Shopping", "Checkout", "Login",
        "Rating", "Password Reset", "Sign Up", "Tickets", "Driver List", 'Congrats', "Your Deliveries"];

    var allPages = {
        abovePages: ["_accSetting", "_contact", "_history", "_passwordRecovery" /*,"_passwordReset" ",_signUp", "_login"*/],
        createTicket: ["_homePage", "_shopping", "_checkout", "_login"/*, "_submitted"*/],
        /*acceptTicket: ['_acceptTicket', '_paid'],*/
        /*acceptTicket: ['_cancelTicket','_cancelled'],*/
        confirmTicket: [/*'_confirmTicket',*/ "_rating", /*'_ticketClosed',*/"_passwordReset", "_signUp"],
        driverFlow: ['_tickets', '_driverList', /*'_confirmCompletion', '_completeTicket', '_rating',*/ '_congrats']
    };
    $(document).ready(function () {
        pageInit();
        var i;
        var whichid;
        var glyph;
        var name;
        for (var j = 0; j < allSections.length; j++) {
            var sectionName = allSections[j];
            var section = allPages[sectionName];
            for (i = 0; i < section.length; i++) {
                whichid = section[i];
                for (var k = 0; k < all.length; k++) {
                    if (whichid == all[k]) {
                        glyph = allGlyphs[k];
                        name = pageNames[k];
                        break;
                    }
                }
                loadPage(whichid, '#' + sectionName, i, j);
                var clickVal = "onclick=\"goToPage('" + whichid + "');\"";
                $("#Butt").append("<div " + clickVal + " > <span class= '" + glyph + "'></span> " + name + "   </div>");
            }
        }
    });
})();