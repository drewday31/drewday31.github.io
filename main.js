// --- Auto Add Header and Footer to every HTML page ---
async function injectLayout() {
    // Inject Header
    const headerRes = await fetch('header.html');
    const headerHtml = await headerRes.text();
    document.getElementById('header-placeholder').innerHTML = headerHtml;

    // Inject Footer
    const footerRes = await fetch('footer.html');
    const footerHtml = await footerRes.text();
    document.getElementById('footer-placeholder').innerHTML = footerHtml;
}

document.addEventListener('DOMContentLoaded', injectLayout);

//Collapse Menu
let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");

toggle.addEventListener('click',function(){
    collapse.forEach(col=>col.classList.toggle("collapse-toggle"))
})

// Sticky Navigation
window.onscroll = function(){myFunction()};

// get current value
let navbar = document.getElementById("header");

// get the navbar position
let sticky = navbar.offsetTop;

// sticky function
function myFunction(){
    if(window.pageYOffset >= sticky){
        navbar.classList.add("sticky");
    }else{
        navbar.classList.remove("sticky");
    }
}