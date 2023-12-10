const api_url = "https://api.quotable.io/search/quotes?query=";
const api_urll = "https://api.quotable.io/random";
let author = "";
let quote = "";
const searchBox = document.querySelector(".search-box input");
const right = document.querySelector(".r");
const left = document.querySelector(".l");



async function getQuotee(url){
      const response = await fetch(url);
      var data = await response.json();
      // console.log(data);
      left.style.display = 'none';
      right.style.display = 'none';
      searchBox.value = '';
      document.querySelector('.quote-box blockquote').innerHTML = data.content;
      document.querySelector('.quote-box span').innerHTML = data.author;
      quote = document.querySelector('.quote-box blockquote').innerHTML;
      author = document.querySelector('.quote-box span').innerHTML;
}

getQuotee(api_urll);
let i = 0;

async function getQuote(url){
      const response = await fetch(url);
      var data = await response.json();
      // console.log(data);

      if(data.results.length <= 1){
            document.querySelector('.no-results').style.display = 'block';
            left.style.display = 'none';
            right.style.display = 'none';
      }
      else{
            document.querySelector('.no-results').style.display = 'none';
            document.querySelector('.quote-box blockquote').innerHTML = data.results[i].content;
            document.querySelector('.quote-box span').innerHTML = data.results[i].authorSlug;
            quote = document.querySelector('.quote-box blockquote').innerHTML;
            author = document.querySelector('.quote-box span').innerHTML;


            if (i === 0){
                  left.style.display = 'none';
            } 
            else{
                  left.style.display = 'block';
            }
            
            if (i === data.results.length - 1) {
                  right.style.display = 'none';
            }
            else {
                  right.style.display = 'block';
            }
                
            
      }
}

function link(){
      i = 0;
      getQuote(api_url + searchBox.value);
}


function tweet(){
      window.open(href="https://twitter.com/intent/tweet?text=" + quote + " ---- by " + author,"Tweet window" , 'width = 600 , height = 300')
}

searchBox.addEventListener('keydown', (event) =>{
      if(event.key == 'Enter'){
            i = 0;
            getQuote(api_url + searchBox.value);
      }
});

left.addEventListener('click', ()=>{
      i--;
      getQuote(api_url + searchBox.value);
});

right.addEventListener('click', ()=>{
      i++;
      getQuote(api_url + searchBox.value);
});

