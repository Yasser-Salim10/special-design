//Check If there's Local Storage Color OPtion
let mainColors = localStorage.getItem("color_options");

if (mainColors !== null) {
    // console.log('Local storage Is Not Empty Youc Can Set it On Root Now ')
    // console.log(localStorage.getItem("color_options"))

    document.documentElement.style.setProperty('--main-color', mainColors);

    //Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        
        element.classList.remove("active");
        //Add aactive Class On Element With Data-color === Local Storage
        if(element.dataset.color === mainColors) {

            //Add Active Class
            element.classList.add("active")
        }
    });    

}

//Random Background Option
let backGroundOption = true;

//Variable to Control The Background Interval
let backgroundInterval;

//Check if There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");

//Check If Random Background Local Storage is not empty
if( backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {
        backGroundOption =true;
    } else {
        backGroundOption =false;
    }
    //Remove All active Class From All spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {

        document.querySelector(".random-background .yes").classList.add("active");

    } else {
        document.querySelector(".random-background .no").classList.add("active");
    }

}


//Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
//Togle Class Open On Main Settings Box
this.classList.toggle("fa-spin");

//Toggle Class Open On Main Rottation on Self
document.querySelector(".setting-box").classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop On All List Items
colorsLi.forEach(li => {

//Click On Every Items
    li.addEventListener("click" , (e) => {

        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

        //Set Color on Local Storage
        localStorage.setItem("color_options", e.target.dataset.color);

        handleActive(e);
    });
});


//Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

//Loop On All Spans
randomBackEl.forEach(span => {

//Click On Every Spans
    span.addEventListener("click" , (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backGroundOption = true;
            
            randomizeImgs();

            localStorage.setItem("background-option", true);

        }else {
            backGroundOption = false;
            
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);

        }
    });
});



//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];



//Function To Randomize Imgs
function randomizeImgs() {
    if(backGroundOption === true) {
        backgroundInterval = setInterval(() => {

        //Get random number
        let randomNumber = Math.floor(Math.random() * imgsArray.length);

        //Change BAckground Image Url
        landingPage.style.backgroundImage ='url("imgs/' + imgsArray[randomNumber] + '")';
    }, 1000)    
        }
}
randomizeImgs();

//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll =function () {

    //Skills Offset Tip
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window scroll Top
    let windowScrollTop = this.pageYOffset;
    
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });
    }
}
//Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click',(e) => {

        //Create Overlay Element
        let overlay =document.createElement("div");

        //Add Class To Overlay
        overlay.className = 'popup-overlay';

        //Append overlay to the body
        document.body.appendChild(overlay);

        //Create the popup
        let popupBox = document.createElement("div");

        //Add class To The POpup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            //Create Headeing
            let imagHeading = document.createElement("h3");

            //Create tetx for heading
            let imgText = document.createTextNode(img.alt);

            //Append the text to the heading
            imagHeading.appendChild(imgText);

            //Append The Heading to the popup box
            popupBox.appendChild(imagHeading);
        } 

        //Create THe Image
        let popupImage = document.createElement("img");

        //Set Image Source
        popupImage.src= img.src;

        //Add Image To OPpupBox
        popupBox.appendChild(popupImage);

        //Append The Poup Box to Body
        document.body.appendChild(popupBox);

        //Create the Close SPan
        let closeButton =document.createElement("span");

        //Create THe Close Button Text
        let closeButtonText = document.createTextNode("X");

        //Append Text To CLose Button
        closeButton.appendChild(closeButtonText);

        //Add Class to Class Button
        closeButton.className = 'close-button';

        //Add Close button to the close box 
        popupBox.appendChild(closeButton);

    });
});

//Close Popup
document.addEventListener("click", function (e) {

    if(e.target.className == "close-button") {
        
        //Remove current popup
        e.target.parentElement.remove();

        //Remove Overlay
        document.querySelector('.popup-overlay').remove();
    }
})

//Select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");


//Select all Links

const allLinks= document.querySelectorAll(".links a");



function scrollToSomeWhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//HAndle Active State
function handleActive(ev) {
    //Remove Active From All Chilldren
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove("active");
    });
    //Add Active Class On Self
    ev.target.classList.add("active");
}


let bulletSpan = document.querySelectorAll(".bullets-options span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    
    bulletSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';
        
        document.querySelector(".bullets-options .yes").classList.add("active");
    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-options .no").classList.add("active");

    }
}
bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (span.dataset.display ==='show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        }else {
    
            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');

        }
        handleActive(e);
    })
})

//Reset Button

document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();

    localStorage.removeItem("color_option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets_option");

    //Reload Window
    window.location.reload();
}

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    //Stop Propagation
    e.stopPropagation();

    //Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    //Toggle Class "open" On Links
    tLinks.classList.toggle("open");

};

//Click Any where Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check if Menu is open
        if(tLinks.classList.contains("open")) {

            //Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            //Toggle Class "open" On Links
            tLinks.classList.toggle("open");

            
        }

    }
    
});
//Stop Propagation Menu
tLinks.onclick = function (e) {

    e.stopPropagation();

}