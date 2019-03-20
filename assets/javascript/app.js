
let start_over=false
let result
let image_gif
let gif_url
let question_num
let count=0
let question_timer
let second=0
let correct=0
let wrong=0
let notanswered=0
let option_chosen=false
let option
let timer_reset=false
let timer_enable=false
let timer_div,question_div, a_div,b_div,c_div,d_div,title_div

fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy')
.then(r=>r.json())
.then(({results})=>{
    result=results
})
.catch(e=>{console.error(e)})

fetch('https://api.giphy.com/v1/gifs/search?api_key=uVTFWMayMvW3ZfWrR3lmZvh1hANziKFs&q=fun&limit=25&offset=0&rating=G&lang=en')
.then(r=>r.json())
.then(({data})=>{
    image_gif=data
    console.log(image_gif)
})
.catch(e=>{console.error(e)})

document.addEventListener('click',({target})=>{
    if(target.className==="start_button")
    {
        count=0
        timer_reset=true
        timer_enable=true
        initial_display()
    }
    if(target.className==="a_class" || target.className==="b_class" || target.className==="c_class" || target.className==="d_class" )
    {
        target.style.backgroundColor="orange"
        option_chosen=true
        option=target.textContent
    }
})
question_timer=setInterval(_=>{

    if(timer_enable)
        {
            if(second===30){
                notanswered++
                gif_url=image_gif[0].embed_url
                display_message("Time out",gif_url)
            }
            else if(option_chosen)
            {
                if(option===result[count].correct_answer)
                {
                gif_url=image_gif[1].embed_url
                display_message("Correct",gif_url)
                correct++

                }
                else{
                    gif_url=image_gif[2].embed_url
                    display_message("Nope",gif_url)
                    wrong++
                }
            }
            else{
                second++
                dispaly_timer()
            }
            
        }     
    
},1000)

 const dispaly_timer=()=>{
    document.querySelector(".timer_class").textContent=`Time Remaining : ${30-second} Seconds`
 }


 const initial_display=()=>{
    document.querySelector(".white_page").innerHTML=``;
    document.querySelector(".white_page").innerHTML=`  <h1 class="title">Sport Trivia!</h1>
    `;
    timer_div=document.createElement('div')
    timer_div.className="timer_class"
    timer_div.innerHTML=`Time Remaining : ${30-second} Seconds`
    document.querySelector(".white_page").append(timer_div)
    question_div=document.createElement('div')
    question_div.className="question_class"
    question_div.textContent=`${result[count].question}`
    document.querySelector(".white_page").append(question_div)
    a_div=document.createElement('div')
    a_div.className="a_class"
    a_div.textContent=`${result[count].correct_answer}`
    document.querySelector(".white_page").append(a_div)
    b_div=document.createElement('div')
    b_div.className="b_class"
    b_div.textContent=`${result[count].incorrect_answers[0]}`
    document.querySelector(".white_page").append(b_div)
    c_div=document.createElement('div')
    c_div.className="c_class"
    c_div.textContent=`${result[count].incorrect_answers[1]}`
    document.querySelector(".white_page").append(c_div)
    d_div=document.createElement('div')
    d_div.className="d_class"
    d_div.textContent=`${result[count].incorrect_answers[2]}`
    document.querySelector(".white_page").append(d_div)
 }
 
 
 
 const display_message=(message,uurrll)=>{
     timer_enable=false
    document.querySelector(".white_page").innerHTML=``;
    document.querySelector(".white_page").innerHTML=`  <h1 class="title">Sport Trivia!</h1>
    `;
    question_div=document.createElement('div')
    question_div.className="question_class"
    question_div.textContent=`${message}!\n the correct answer was ${result[count].correct_answer}`
    document.querySelector(".white_page").append(question_div)
    imggif=document.createElement('img')
    console.log(uurrll)
    imggif.src=("url",uurrll)
    document.querySelector(".white_page").append(imggif)

    setTimeout(_=>{
        count++
        second=0
        option_chosen=false
       
        if(count===result.length)
            {
                display_result()
                
            }
            else
            {
                initial_display()
                timer_enable=true
            }

    },2000)
    
 }

 const display_result=_=>{
    timer_enable=false
   document.querySelector(".white_page").innerHTML=``;
   document.querySelector(".white_page").innerHTML=`  <h1 class="title">Sport Trivia!</h1>
   `
   console.log(timer_enable)

   question_div=document.createElement('div')
   question_div.className="question_class"
   question_div.textContent=`Number of correct answers: ${correct}\n Number of wrong answers: ${wrong}\n Number of missed questions: ${notanswered}\n`
   document.querySelector(".white_page").append(question_div)
   start_over=document.createElement('button')
   start_over.className="start_button"
   start_over.textContent="Start Over"
   document.querySelector(".white_page").append(start_over)

   count=0
   second=0
   option_chosen=false
   
}

