
var stage=1;
stageselect(1);
//$('.startagain').text ='next stage';
// هذه الدالة من اجل اختيار البطاقات حسب كل مرحلة سيكون للمرحلة الاولى 8 بطاقات وللثانية 12 وللثالثة 16
function stageselect(){
    if (stage == 1){
        objects = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor'];
        $('.deck').css({
            "height" : "400px",
            "padding": "50px",
        })       
      }
      else if(stage == 2){
          objects = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt'];
          $('.deck').css({
            "height" : "470px",
            
        })    
    }
      else {
          objects = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt','bomb','bomb','diamond','diamond'];
          $('.deck').css({            
            "height" : "490px",           
        })  

      }
      return objects,stage ;
}
// if(stage ==1)
//     $('.titlegame').html = 'Memory Game (first stage)';
// first stage هذه الدالة لتغير العنوان حسب كل مرحلة مثلا عندما نكون في المرحلة الأولى سيكون العنوان 
function titlechange(){
    if(stage ==1)
    $('.titlegame').html("first stage");
    else if(stage ==2)
    $('.titlegame').html("second stage");
    else if(stage ==3)
    $('.titlegame').html("third stage");
   
}
//هذه الدالة للانتقال الى المرحللة التالية بعد انهاء المرحلة الحالية
function nextstage(){
    let ob;
    ob,stage=stageselect();
    stage = stage + 1;  
    //console.log(stage);
    if(stage >3){
        stage = 1;
    }
    movepage();
}
//هذه الدالة ليتمكن اللاعب من العودة الى المرحلة السابقة
function previouspage(){
    stage=stage-1;
    movepage();
    
}
//دالة مساعدة لعدم تكرار استدعاء هذه الدوال(اختصار الكود)
function movepage(){
    titlechange();
    stageselect();
    totalCard = objects.length / 2;
    stagestar();
    init();
}
    // jquery باستخدام  html تحديد عناصر ال  
    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),
    

    // أعطاء قيم ابتدائية للمتغيرات
    nowTime = 0,
    allOpen = [],
    match = 0,
    second = 0,
    moves = 0,
    wait = 420,
    //معرفة عدد البطاقات المختلفة الموجودة في المرحلة
    totalCard = objects.length / 2;
    
    //تقييم عدد النجوم التي سيحصل عليها في كل مرحلة بحسب عدد المحاولات
    function stagestar(){
        if(stage ==1 ){
            stars5 = 4,
            stars4 = 5,
            stars3 = 6,
            stars2 = 7,
            stars1 = 8;
        }else{
            stars5 = 4,
            stars4 = 6,
            stars3 = 8,
            stars2 = 10,
            stars1 = 12;
        }
    }
    stagestar();
   

// دالة لخلط البطاقات وعرضها بشكل عشوائي
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// هذه الدالة ليتمكن من اعادة اللعبة يعني الوقت وعدد المحاولات سيعود صفر وكذلك ستختلط البطاقات بشكل عشوائي
function init() {
    //ستختلط الاوراق بشكل عشوائي ويتم تخزينها في متغير
    let allCards = shuffle(objects);
    //ستختفي الاوراق القديمة
    $deck.empty();

    // عندما نبدأ اللعبة من جديد سيكزن عدد المحاولات صفرا وستكون كل البطاقات مقلوبة
    match = 0;
    moves = 0;
    $moves.text('0');

    
    //هذه الحلقة من اجل اضافة جميع البطاقات وعرصها في الصفحة
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    //ستتحقق هذه الدالة من البطاقتين اللتان فتحهما الاعب هل هما متطابقتان او لا في حال كانتا متطابقتان يبقيان مفتوحتان ويتحول لونهما
    //    الى الون الأخضر من اصدار صوت
    //وفي حال انهما غير متطابقتين سيغلقان من جديد مع اصدار صوت معين
    addCardListener();

    // تصفير عداد الوقت عند بدء لعبة جديدة
    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}

// أضافة نتيجة اي عدد النجوم التي سيحصل عليها الاعب بحسب عدد المحاولات التي استهلكها
function rating(moves) {
    let rating = 5;
    if (moves >= stars5 && moves < stars4) {
        $rating.eq(5).removeClass('fa-star').addClass('fa-star-o');
        rating = 5;
    }else if (moves >= stars4 && moves < stars3) {
        $rating.eq(4).removeClass('fa-star').addClass('fa-star-o');
        rating = 4;
    }else if (moves >= stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
        rating = 3;
    } else if (moves >= stars2 && moves < stars1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
        rating = 2;
    } else if (moves >= stars1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { score: rating };
}

// عرض شاشة منبثقة بهد انتهاء اللعبة مكتوب فيها عدد المحاولات والوقت الذي استغرقه اللاعب لاختياز المرحلة
function gameOver(moves, score) {
    $('#winnerText').text(`In  : ${second} seconds, you did a total of : ${moves} moves with a score of  ${score}. Well done !`);
    $('#winnerModal').modal('toggle');
     if(stage == 3){
        //$('.startagain').hide();
        $('.startagain').html("start again");
        // console.log('start again calisti !!!!!!');
       
     }
     else{
        $('.startagain').html("next stage");
     }
}

// عند الضغط على الزر سيتمكن من اعادة تعيين البطاقات ايضا
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        init();
    }
});


    //ستتحقق هذه الدالة من البطاقتين اللتان فتحهما الاعب هل هما متطابقتان او لا في حال كانتا متطابقتان يبقيان مفتوحتان ويتحول لونهما
    //    الى الون الأخضر من اصدار صوت
    //وفي حال انهما غير متطابقتين سيغلقان من جديد مع اصدار صوت معين
let addCardListener = function () {

    //يتم قلب البطاقة التي تم الضغط عليها
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) {
             return true; 
        }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);
        console.log(card);

        //المقارنة بين البطاقات هل هي متطابقة ام لا
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                audioRight.play();
                setTimeout(function () {
                $deck.find('open').removeClass('open show');
                }, wait);
                match++;

                //اذا كانت البطاقات غير متطابقة فبعد ثواني قليلة سيعيد قلبها من جديد
            } else {
                $deck.find('.open').addClass('notmatch');
                audioWrong.play();
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            //تحدد جميع البطاقات التي تم فتحها
            allOpen = [];

            //يزداد عدد المحاولات بواحد في حال تطابقت البطاقات او لا
            moves++;

            //عدد المحاولات التي استهلكها اللاعب سيتم تمريرها الى الدالة التي ستقوم بدورها بتقييم عدد النجوم التي سيحصل عليها
            rating(moves);

            //تضيف هذه الدالة عدد المحاولات التي استهلكها الاعب الى الشاشة المنبثقة
            $moves.html(moves);
        }

        //عند انتهاء اللاعب من مرحلة معينة ستظهر شاشة منبثقة مكتوب عليها عدد المحاولات والوقت الذي استغرقه الاعب وكذلك عدد النجوم التي حصل عليها
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}
//
var audioRight = new Audio('img/right.wav');
var audioWrong = new Audio('img/wrong.wav');
//عداد للوقت بالثواني منذ بدأ المرحلة وحتى انتهاؤها
function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

// اذا كان عداد الوقت ليس صفرا سيقوم بتصفيره
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}
init();

//عند الضغط على الزر سيبدأ الاعب باللعبة(المرحلة الأولى)
$('.btnletsgo').click(function(){
    window.location.href='game.html';
})

//عند الضغط على الزر سيعود للمرحلة السابقة
$('.btnback').click(function(){
    if(stage ==1)
    window.location.href='index.html';
    else if(stage == 2 )
    //window.location.href='game.html';
     previouspage(stage);
    else if(stage == 3){
        previouspage(stage);
    }
})
