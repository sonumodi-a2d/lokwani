

  const serviceItems = document.querySelector(".latest-news");
  const popup = document.querySelector(".popup-box")
  const popupCloseBtn = popup.querySelector(".popup-close-btn");
  const popupCloseIcon = popup.querySelector(".popup-close-icon");
  serviceItems.addEventListener("click",function(event){
    if(event.target.tagName.toLowerCase() == "button"){
       const item =event.target.parentElement;
       const h4 = item.querySelector("h3").innerHTML;
       alert(h4);
       const readMoreCont = item.querySelector(".news-description").innerHTML;
       popup.querySelector("h3").innerHTML = h4;
       popup.querySelector(".popup-body").innerHTML = readMoreCont;
       popupBox();
    }

  })

  popupCloseBtn.addEventListener("click", popupBox);
  popupCloseIcon.addEventListener("click", popupBox);

  popup.addEventListener("click", function(event){
     if(event.target == popup){
        popupBox();
     }
  })

  function popupBox(){
    popup.classList.toggle("open");
  }

