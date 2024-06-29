const api_url = "https://api.api-ninjas.com/v1/quotes?category=";
const api_urll = "https://api.api-ninjas.com/v1/quotes"

let author = "";
let quote = "";
const searchBox = document.querySelector(".search-box input");
const right = document.querySelector(".r");
const left = document.querySelector(".l");
const apiKey = "getyourapiKey";


async function getQuotee(url){
      const response = await fetch(url , {headers: {"X-Api-Key": apiKey}});
      var data = await response.json();
      console.log(data);
      const firstQuote = data[0];
      left.style.display = 'none';
      right.style.display = 'none';
      searchBox.value = '';
      document.querySelector('.quote-box blockquote').innerHTML = firstQuote.quote;
      document.querySelector('.quote-box span').innerHTML = firstQuote.author;
      quote = firstQuote.quote;
      author = firstQuote.author;
}

getQuotee(api_urll);
let i = 0;

async function getQuote(url){
      const response = await fetch(url , {headers: {"X-Api-Key": apiKey}});
      var data = await response.json();
      console.log(data);

      if(data.length < 1){
            document.querySelector('.no-results').style.display = 'block';
            left.style.display = 'none';
            right.style.display = 'none';
      }
      else{
            console.log("hello");
            document.querySelector('.no-results').style.display = 'none';
            document.querySelector('.quote-box blockquote').innerHTML = data[i].quote;
            document.querySelector('.quote-box span').innerHTML = data[i].author;
            quote = data[i].quote;
            author = data[i].author;


            if (i === 0){
                  left.style.display = 'none';
            } 
            else{
                  left.style.display = 'block';
            }
            
            if (i === data.length - 1) {
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
      var message = encodeURIComponent(
            '"' + quote + '"\n' + // Quote wrapped in double quotes
            '\n- ' + author + '\n\n' + // Author name with a line break before it
            'For more quotes, visit Quotify at https://yashvardhann15.github.io/Quote-Generator/'
        );

      window.open(href="https://twitter.com/intent/tweet?text=" + message,"Tweet Window" , 'width = 600 , height = 300')
}

function whatsapp() {
      var message = encodeURIComponent(
          '"' + quote + '"\n' + 
          '\n- ' + author + '\n\n' + 
          'For more quotes, visit Quotify at https://yashvardhann15.github.io/Quote-Generator/'
      );
  
      window.open("https://api.whatsapp.com/send/?text=" + message, "Whatsapp window", 'width=600,height=300');
}
  

searchBox.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          event.preventDefault(); // Prevent the form from being submitted
          const searchTerm = searchBox.value.trim();
          if (searchTerm) {
              const searchUrl = `${api_url}${encodeURIComponent(searchTerm)}`;
              i = 0; // Reset index for new search results
              getQuote(searchUrl); // Perform the search with the constructed URL
          }
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
