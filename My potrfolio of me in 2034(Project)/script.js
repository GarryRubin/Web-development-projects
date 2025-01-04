//making a responsive nav bar
function showSidebar(){                                                
     const sidebar = document.getElementsByClassName("sidebar");
     sidebar[0].style.display = 'flex';
 };
            
 function closeSidebar(){
     const sidebar = document.getElementsByClassName("sidebar");
     sidebar[0].style.display = 'none';
 }

//creating an image slider on projects page

//a variable to store images that will be switched. As I have 3 sliders this variabe will be an array containing fisrt image of each of the sliders(they are depicted as you load the page). With the use of a parameter "a" I will reffer to an image I want to change
var sliderImg = document.getElementsByClassName("picture");

//array of images for each of the sliders
var images1 = ['media/projectspage/Portfolio_web/51ff73ef-a3b4-4e0d-969e-29ebfa33f2de.webp', 'media/projectspage/Portfolio_web/Bazil - Portfolio - Awwwards Honorable Mention.jpeg','media/projectspage/Portfolio_web/Portfolio _ CV _ Graphic Design _ Digital Marketing.jpeg'];
var images2 = ['media/projectspage/Task_manager_web/Task Manager - Board.jpeg', 'media/projectspage/Task_manager_web/Task and Project Management Dashboard Design.jpeg', 'media/projectspage/Task_manager_web/Task Management for Teams_ Choosing the Right Software for Your Needs.jpeg'];
var images3 = ['media/projectspage/Car_dealer_web/Car Dealer - Automotive Responsive WordPress Theme.jpeg', 'media/projectspage/Car_dealer_web/carwebsite.jpg', 'media/projectspage/Car_dealer_web/carwebsite1.jpg'];

// current image index for the 1st, 2nd, 3rd slider
var index1 = 0; 
var index2 = 0;
var index3 = 0; 

function switchL(a, index, images){
    //local variables to change the global ones. dependong on the parameter value, the correct global slider variables vlalues will be assigned to the local ones
    var images = images;
    var index = index;

    //switching the index and assigning the corresponding image form the corresponding array to the image we are switching
    if(index <=0){
        index = images.length - 1;
    } 
    else if(index > 0){
        index--;
    }
    sliderImg[a].src = images[index];
    
    // Update the global index
    if (a === 0) {
        index1 = index;
    } else if (a === 1) {
        index2 = index;
    } else if (a === 2) {
        index3 = index;
    }
}

function switchR(a, index, images){
    //local variables to change the global ones. dependong on the parameter value, the correct global slider variables will be assigned to the local ones
    var images;
    var index; 

    //switching the index and assigning the corresponding image form the corresponding array to the image we are switching
    if(index < images.length - 1){
        index++;
    }
    else if(index == images.length - 1){
        index = 0;
        
    } 
    sliderImg[a].src = images[index];
    
    // Update the global index
    if (a === 0) {
        index1 = index;
    } else if (a === 1) {
        index2 = index;
    } else if (a === 2) {
        index3 = index;
    }
}

//showing arrow buttonts when hovering on pictures(project page)
function showButtons(a){
    const Rbuttons = document.getElementsByClassName("Rbutton");
    Rbuttons[a].style.display = "block";
    
    const Lbuttons = document.getElementsByClassName("Lbutton");
    Lbuttons[a].style.display = "block";
}
function hideButtons(a){
    const Rbuttons = document.getElementsByClassName("Rbutton");
    Rbuttons[a].style.display = "none";
    const Lbuttons = document.getElementsByClassName("Lbutton");
    Lbuttons[a].style.display = "none";
}
