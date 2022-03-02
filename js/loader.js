(function () {

    const loaderEl = document.querySelector('.loader');

    //Fetch category list and id
    fetch("https://admin.lokwani.in/api/categories").then(a=>{a.json().then(a=>{if(a.length>0){var e="";a.forEach(a=>{e+=`<li id="categorylist"><a href="#"><span class="categoryid${a.id} categoryid">${a.id}</span>${a.name}</a></li>`}),document.getElementById("navbar").innerHTML=e}})});
    //End of category list and id

    var i=0;
    //Fetch category news data and show
    $(function() {
        var i;
        var category_url= 'https://admin.lokwani.in/api/general_news?category_id=';
        $("#navbar").click(function(e) {
            i=1;
            var clickedValue = $(e.target).text();
            Value = category_url+(clickedValue).replace(/(^\d+)(.+$)/i,'$1');
            $('#latest-root div').remove();
            fetch(Value+"&page="+i).then(
                res=>{
                    res.json().then(
                        dataa=>{
                            console.log(dataa.last_page);
                            console.log(dataa.current_page);
                            var bts="";
                            for (let u of dataa.data) {

                                var desc = u.description;

                                var div = document.createElement("div");
                                div.innerHTML = desc;
                                var text = div.textContent || div.innerText || "";


                                console.log(desc);
                                /* Trim News */
                                if (text.length > 200) {
                                    text = text.substring(0,200) + '<button class="btn" type="button">Read More</button>';
                                }
                                /* End of Trim News */

                            bts+=`<div class="latest-news-box">
                            <div class="latest-news-container">
                            <img src="${u.featured_image}" alt="${u.title}">
                            <h3 class="news-heading">${u.title}</h3>
                            <span><b>${u.categoryName}</b> , <b>${u.reporterName}</b>,</span><br><br><span> ${u.updateDate}, ${u.updateTime}</span>
                            <div class="news-description">${text}</div>
                            </div>
                            </div>`;
                            }
                            document.getElementById("latest-root").innerHTML = bts;
                        }
                    )
                }
            )

            //Load next news
            $(window).scroll(function() {  
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                i++;
                fetch(Value+"&page="+i).then(
                    res=>{
                        res.json().then(
                            dataa=>{
                                console.log(dataa.last_page);
                                console.log(dataa.current_page);
                                var lats="";
                                for (let u of dataa.data) {
                                    lats+=`<div class="latest-news-box">
                                <div class="latest-news-container">
                                <img src="${u.featured_image}" alt="${u.title}">
                                <h3>${u.title}</h3>
                                <span>${u.categoryName} , ${u.reporterName},</span><br><br><span> ${u.updateDate}, ${u.updateTime}</span>
                                <div class="news-description">${u.description}</div>
                                </div>
                                </div>`;
                                }
                                var d1 = document.getElementById('latest-root');
                                d1.insertAdjacentHTML('beforeend', lats);
                            }
                        )
                    }
                )
            }      });

            //End of load new page

        });

    //Fetch category news data and show

        var j=1;
        //Check news section is empty or not
        function isEmpty( el ){
            return !$.trim(el.html())
        }
        if (isEmpty($('#latest-root'))){
            var general_news_url_page="https://admin.lokwani.in/api/general_news?page=";
            var general_news_url="https://admin.lokwani.in/api/general_news?page=1";
            fetch(general_news_url).then(
                res=>{
                    res.json().then(
                        dataa=>{
                            console.log(dataa.last_page);
                            console.log(dataa.current_page);
                            var lats="";
                            for (let u of dataa.data) {
                                lats+=`<div class="latest-news-box">
                            <div class="latest-news-container">
                            <img src="${u.featured_image}" alt="${u.title}">
                            <h3>${u.title}</h3>
                            <span>${u.categoryName} , ${u.reporterName},</span><br><br><span> ${u.updateDate}, ${u.updateTime}</span>
                            <div class="news-description">${u.description}</div>
                            </div>
                            </div>`;
                            }
                            document.getElementById("latest-root").innerHTML = lats;
                        }
                    )
                }
            )
            
            $(window).scroll(function() {  
                if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    j++;
                    fetch(general_news_url_page+j).then(
                        res=>{
                            res.json().then(
                                dataa=>{
                                    console.log(dataa.last_page);
                                    console.log(dataa.current_page);
                                    var lats="";
                                    for (let u of dataa.data) {
                                        lats+=`<div class="latest-news-box">
                                    <div class="latest-news-container">
                                    <img src="${u.featured_image}" alt="${u.title}">
                                    <h3>${u.title}</h3>
                                    <span>${u.categoryName} , ${u.reporterName},</span><br><br><span> ${u.updateDate}, ${u.updateTime}</span>
                                    <div class="news-description">${u.description}</div>
                                    </div>
                                    </div>`;
                                    }
                                    var d1 = document.getElementById('latest-root');
                                    d1.insertAdjacentHTML('beforeend', lats);
                                }
                            )
                        }
                    )
                }      });

        }

          //End Of Check news section is empty or not

    });



})();