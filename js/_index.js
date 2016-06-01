/**
 * Created by zeusn_000 on 5/21/2016.
 */


// function whenLogedIn(){
//
//     var clickVal = "onclick=\"goToPage('" + whichid + "');\"";
//     $("#index-Login").remove();
//     $("#index-SignUp").remove();
//     $("#Butt").append("<div class='panel-divs' id='index-Home' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-home'></span> Home </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-Setting' onclick=goToPage('_accSetting'); > <span class= 'glyphicon glyphicon-cog'></span> Setting</div>");
//     $("#Butt").append("<div class='panel-divs'id='index-Contact' onclick=goToPage('_contact'); > <span class= 'glyphicon glyphicon-equalizer'></span> Contact </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-History' onclick=goToPage('_history'); > <span class= ''></span> History </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-Shopping' onclick=goToPage('_shopping'); > <span class= ''></span> Shopping </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-CheckOut' onclick=goToPage('_checkout'); > <span class= 'glyphicon glyphicon-check'></span> Checkout </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-Rating' onclick=goToPage('_rating'); > <span class= 'glyphicon glyphicon-signal'></span> Rating </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-Tickets' onclick=goToPage('_tickets'); > <span class= ''></span> Tickets </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-DeliverList' onclick=goToPage('_driverList'); > <span class= ''></span> Dirver List </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-Deliveries' onclick=goToPage('_yourDeliveries'); > <span class= ''></span> Your Deliveries </div>");
//     $("#Butt").append("<div class='panel-divs'id='index-LogOut' onclick=loader.logout(); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");
// }
    var toggle = "Shopper";
    // Wait for everything to load, then check loader.isLoggedIn
    setTimeout(function() {
        if(loader.isLoggedIn) {
            $("#index_login_top").hide();
            $("#User-Info").show();
            $("#open-menu-drawer").show();
            $("#index-Home").remove();
            $("#index-Contact").remove();
            $("#index-Setting").remove();
            $("#index-LogOut").remove();
            $("#index-Deliveries").remove();
            $("#index-Tickets").remove();
            $("#index-History").remove();
            
            $("#Butt").append("<div class='panel-divs' id='index-Home' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-home'></span> Home </div>");
            $("#Butt").append("<div class='panel-divs'id='index-Contact' onclick=goToPage('_contact'); > <span class= 'glyphicon glyphicon-equalizer'></span> Contact </div>");
            $("#Butt").append("<div class='panel-divs'id='index-Setting' onclick=goToPage('_accSetting'); > <span class= 'glyphicon glyphicon-cog'></span> Setting</div>");
            
            if(toggle=="Shopper"){
                $("#Butt").append("<div class='panel-divs'id='index-History' onclick=goToPage('_history'); > <span class= 'glyphicon glyphicon-shopping-cart'></span> Your Orders </div>");
            }
            else{
                $("#Butt").append("<div class='panel-divs'id='index-Tickets' onclick=goToPage('_tickets'); > <span class= 'glyphicon glyphicon-list-alt'></span> Tickets </div>");
                $("#Butt").append("<div class='panel-divs'id='index-Deliveries' onclick=goToPage('_yourDeliveries'); > <span class= 'glyphicon glyphicon-exclamation-sign'></span> Your Deliveries </div>");
            }
            $("#Butt").append("<div class='panel-divs'id='index-LogOut' onclick=loader.logout(); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");
        }
        else{
            $("#open-menu-drawer").hide();
            $("#index-menu-drawer").show();
            $("#Butt").append("<div class='panel-divs'id='index-Login'onclick=goToPage('_login'); > <span class= 'glyphicon glyphicon-log-in'></span> Login</div>");
            $("#Butt").append("<div class='panel-divs'id='index-SignUp'onclick=goToPage('_signUp'); > <span class= 'glyphicon glyphicon-plus-sign'></span> Sign Up </div>");
        }
    }, 100);


    $("#open-menu-drawer").on('click',function(event){
        if(loader.isLoggedIn) {
            $("#User-Info").show();
            $("#toggleButton").show();
            $("#index-Login").remove();
            $("#index-SignUp").remove();
            loadAccountData();
            changePanel();
        }

    });
    function changePanel(){

    }
    function index_login(){
        $("#open-menu-drawer").show();
        $("#index_login_top").hide();
        $("#User-Info").show();
        $("#index-Login").remove();
        $("#index-SignUp").remove();
        $("#index-Home").remove();
        $("#index-Contact").remove();
        $("#index-Setting").remove();
        $("#index-LogOut").remove();
        $("#Butt").append("<div class='panel-divs' id='index-Home' onclick=goToPage('_homePage'); > <span class= 'glyphicon glyphicon-home'></span> Home </div>");
        $("#Butt").append("<div class='panel-divs'id='index-Contact' onclick=goToPage('_contact'); > <span class= 'glyphicon glyphicon-equalizer'></span> Contact </div>");
        $("#Butt").append("<div class='panel-divs'id='index-Setting' onclick=goToPage('_accSetting'); > <span class= 'glyphicon glyphicon-cog'></span> Setting</div>");

        $("#Butt").append("<div class='panel-divs'id='index-History' onclick=goToPage('_history'); > <span class= 'glyphicon glyphicon-shopping-cart'></span> Your Orders </div>");
        $("#Butt").append("<div class='panel-divs'id='index-LogOut' onclick=loader.logout(); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");

    }

    function toggleShopper(){
        $("#index-Deliveries").remove();
        $("#index-Tickets").remove();
        $("#index-History").remove();
        $("#index-LogOut").remove();
        $("#Butt").append("<div class='panel-divs'id='index-History' onclick=goToPage('_history'); > <span class= 'glyphicon glyphicon-shopping-cart'></span> Your Orders </div>");
        $("#Butt").append("<div class='panel-divs'id='index-LogOut' onclick=loader.logout(); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");
        loader.switchToShopper();





    }
    function toggleDriver(){
        $("#index-Deliveries").remove();
        $("#index-Tickets").remove();
        $("#index-History").remove();
        $("#index-LogOut").remove();

        $("#Butt").append("<div class='panel-divs'id='index-Tickets' onclick=goToPage('_tickets'); > <span class= 'glyphicon glyphicon-list-alt'></span> Tickets </div>");
        $("#Butt").append("<div class='panel-divs'id='index-Deliveries' onclick=goToPage('_yourDeliveries'); > <span class= 'glyphicon glyphicon-exclamation-sign'></span> Your Deliveries </div>");
        $("#Butt").append("<div class='panel-divs'id='index-LogOut' onclick=loader.logout(); > <span class= 'glyphicon glyphicon-off'></span> Log Out </div>");
        loader.switchToDriver();




    }
    function toggles(){
        if(toggle == "Driver"){
            toggle = "Shopper";
            document.getElementById('toggling').innerHTML = "Shopper"
            toggleShopper();
        }
        else{
            toggle = "Driver";
            document.getElementById('toggling').innerHTML = "Driver "
            toggleDriver();
        }
    }
