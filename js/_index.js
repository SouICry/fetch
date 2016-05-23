/**
 * Created by zeusn_000 on 5/21/2016.
 */
(function () {
    var toggle = "Shopper";
    var PanelLogin
    var all = ["_accSetting", "_contact", "_history", "_passwordRecovery", "_homePage", "_shopping", "_checkout", "_login",
        "_rating", "_passwordReset", "_signUp", "_tickets", "_driverList2", '_congrats', "_yourDeliveries"];

    var allGlyphs = ["glyphicon glyphicon-cog", "", "", "glyphicon glyphicon-wrench", "glyphicon glyphicon-home",
        "", "glyphicon glyphicon-check", "glyphicon glyphicon-log-in", "glyphicon glyphicon-signal",
        "glyphicon glyphicon-repeat",
        "glyphicon glyphicon-plus-sign", "", "", ""];

    var pageNames = ["Setting", "Contact", "History", "Password Recovery", "Home", "Shopping", "Checkout", "Login",
        "Rating", "Password Reset", "Sign Up", "Tickets", "Driver List", 'Congrats', "Your Deliveries"];

    function whenLogedIn(){

        var clickVal = "onclick=\"goToPage('" + whichid + "');\"";
        $("#index-Login").remove();
        $("#index-SignUp").remove();
        $("#Butt").append("<div class='panel-divs' id='index-Home' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-home'></span> Home </div>");
        $("#Butt").append("<div id='index-Setting' onclick=goToPage('_accSetting'); > <span class= 'glyphicon glyphicon-cog'></span> Setting</div>");
        $("#Butt").append("<div id='index-Contact' onclick=goToPage('_contact'); > <span class= ''></span> Contact </div>");
        $("#Butt").append("<div id='index-History' onclick=goToPage('_history'); > <span class= ''></span> History </div>");
        $("#Butt").append("<div id='index-Shopping' onclick=goToPage('_shopping'); > <span class= ''></span> Shopping </div>");
        $("#Butt").append("<div id='index-CheckOut' onclick=goToPage('_checkout'); > <span class= 'glyphicon glyphicon-check'></span> Checkout </div>");
        $("#Butt").append("<div id='index-Rating' onclick=goToPage('_rating'); > <span class= 'glyphicon glyphicon-signal'></span> Rating </div>");
        $("#Butt").append("<div id='index-Tickets' onclick=goToPage('_tickets'); > <span class= ''></span> Tickets </div>");
        $("#Butt").append("<div id='index-DeliverList' onclick=goToPage('_driverList2'); > <span class= ''></span> Dirver List </div>");
        $("#Butt").append("<div id='index-Deliveries' onclick=goToPage('_yourDeliveries'); > <span class= ''></span> Your Deliveries </div>");
        $("#Butt").append("<div id='index-LogOut' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");
    }
    $(document).ready(function (){
        $("#Butt").append("<div class='panel-divs'id='index-Login'onclick=goToPage('_login'); > <span class= 'glyphicon glyphicon-log-in'></span> Login</div>");
        $("#Butt").append("<div class='panel-divs'id='index-SigUp'onclick=goToPage('_signUp'); > <span class= 'glyphicon glyphicon-plus-sign'></span> Sign Up </div>");
    });
    function toggleShopper(){
        $("#Butt").append("<div class='panel-divs' id='index-Home' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-home'></span> Home </div>");
        $("#Butt").append("<div id='index-History' onclick=goToPage('_history'); > <span class= ''></span> History </div>");
        $("#Butt").append("<div id='index-Setting' onclick=goToPage('_accSetting'); > <span class= 'glyphicon glyphicon-cog'></span> Setting</div>");
        $("#Butt").append("<div id='index-LogOut' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");



    }
    function toggleDriver(){
        $("#Butt").append("<div class='panel-divs' id='index-Home' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-home'></span> Home </div>");
        $("#Butt").append("<div id='index-Deliveries' onclick=goToPage('_yourDeliveries'); > <span class= ''></span> Your Deliveries </div>");
        $("#Butt").append("<div id='index-Setting' onclick=goToPage('_accSetting'); > <span class= 'glyphicon glyphicon-cog'></span> Setting</div>");
        $("#Butt").append("<div id='index-Rating' onclick=goToPage('_rating'); > <span class= 'glyphicon glyphicon-signal'></span> Rating </div>");
        $("#Butt").append("<div id='index-LogOut' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");

    }
    function toggles(){
        if(toggle == "Driver"){
            toggle = "Shopper";
            toggleShopper();
        }
        else{
            toggle = "Driver";
            toggleDriver();
        }
    }
    // $(document).ready(function () {
    //     var i;
    //     var whichid;
    //     var glyph;
    //     var name;
    //     for (var j = 0; j < allSections.length; j++) {
    //         var sectionName = allSections[j];
    //         var section = allPages[sectionName];
    //         for (i = 0; i < section.length; i++) {
    //             whichid = section[i];
    //             for (var k = 0; k < all.length; k++) {
    //                 if (whichid == all[k]) {
    //                     glyph = allGlyphs[k];
    //                     name = pageNames[k];
    //                     break;
    //                 }
    //             }
    //             var clickVal = "onclick=\"goToPage('" + whichid + "');\"";
    //             $("#Butt").append("<div " + clickVal + " > <span class= '" + glyph + "'></span> " + name + "   </div>");
    //         }
    //     }
    // });
    $(document).on('click', '.toggle-button', function() {
        $(this).toggleClass('toggle-button-selected');
    });
})();