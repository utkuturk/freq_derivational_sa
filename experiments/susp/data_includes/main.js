// TODO: 
// [X] put fillers and exp and practice into same template 
// [ ] improve text_css to get a value for fontsize
// [X] include yes/no + likert / ARE WE DOING THIS?
// [ ] improve overall css for presentation. text should not wrap to the window.
// [ ] improve css for the question.
// [X] make sure that question only pops up for some of the trials
// [X] add Latin Square Group
// [ ] correct repeating "devam" or "space"
// [ ] Edit intro and explanations
// [ ] Header completion
// [ ] Create a completion code and ask for that in the google form
// [ ] Create a google form after the experient for them to give their email address

PennController.ResetPrefix();
PennController.DebugOff();
PennController.SetCounter("increase")

Sequence("instructions", "intro", "counter", startsWith("practice"), "break", rshuffle("exp", "filler"), "SendResults()");

var sendingResultsMessage = "Sonuçlarınız gönderiliyor, lütfen bekleyin.";
var randomnumber = Math.floor(Math.random()*1000000);
var completionCode = String("CO" + randomnumber);
var completionMessage = "Sonuçlarınız gönderildi. Deney tamamlama kodunuzu not edip sekmeyi kapatabilirsiniz. Deney tamamlama kodunuz:" + completionCode;
var progressBarText = "Ne kadar kaldı?";


Header(
    newVar("itemNum").global(),
    newVar("trialNum").global(),
    newVar("sentence").global(),
    newVar("type").global(),
    newVar("conj1").global(),
    newVar("conj2").global(),
    newVar("question").global(),
    newVar("answer").global(),
    newVar("condition").global(),
    newVar("correctAnswer").global()
  )
    // .log("PROLIFIC", GetURLParameter("id"))
    // .log("completionCode", completionCode)
    .log("itemNum", getVar("itemNum"))
    .log("trialNum", getVar("trialNum"))
    .log("sentence" ,getVar("sentence"))
    .log("type" ,getVar("type"))
    .log("conj1" ,getVar("conj1"))
    .log("conj2" ,getVar("conj2"))
    .log("question" ,getVar("question"))
    .log("answer" ,getVar("answer"))
    .log("condition" ,getVar("condition"))
    .log("correctAnswer" ,getVar("correctAnswer"));


var text_css = {
    "font-size": "24px",
    "font-family": "Helvetica, sans-serif"
  };

const trialN = () => [
    newVar("TrialN", 0)
        .settings.global()
        .set((v) => v + 1)
];

const demog = (label, text) => [
    newText("before", text)
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
    ,
    newTextInput(label)
        .before(getText("before"))
        .css("font-size","16px")
        .log()
        .lines(1)
        .print()
    ,
    newVar(label).global().set(getTextInput(label))
];


const print_sentence = (f) => [
    newText(f)
        .css(text_css)
        .center()
        .print()
        .log()
];

const print_scale = () => [
    newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle")
        .css("font-size","20px")
        .css("font-family", "Helvetica, sans-serif")
        .italic()
    ,
    newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil")
        .css("font-size","20px")
        .css("font-family", "Helvetica, sans-serif")
        .italic()
    ,
    newScale(7)
        .radio()
        .labelsPosition("bottom") 
        .before(getText("left"))
        .after(getText("right"))
        .css(text_css)
        .log()
        .center()
        .print()
        .wait() 
];

const print_space = (n,label) => {
    let spaceString = "";
    for (let i = 0; i < n; i++) {
      spaceString += "<p> </p>";
    }
    return [
      newText("Space" + label, spaceString)
        .print()
    ];
  };

const devam = (fontsize, label) => [
    newButton("devam"+label, "Devam")
        .css("font-size",fontsize)
        .css("font-family", "Helvetica, sans-serif")
        .print()
        .wait()
];

    
SetCounter("counter", "inc", 1)

newTrial("instructions",

    fullscreen(),
    
    newText(`<p>Merhaba! Size internet ortamında yürütülen bir psikodilbilim deneyi için ulaşıyoruz. Bu deney Massachusetts Üniversitesi Amherst kampüsünden Özge Bakay tarafından yürütülüyor. </p>
            <p>Bu deneyde Türkçe konuşanların karmaşık Türkçe cümleleri nasıl anlamlandırdığı hakkında fikir edinmeyi amaçlıyoruz. Bunun için bu deneyde sizden verilen cümleleri okuyup sonrasında bu cümleleri puanlamanızı istiyoruz. </p>
            <p>Puanlama yaparken size verilen cümleleri öğretilen dilbilgisi kurallarına göre değil, etrafınızdaki kişilerden duyup duymama ihtimalinize ya da kendi Türkçenize uygun bulup bulmamanıza göre değerlendirmenizi istiyoruz.</p>
            <p>Yani size verilen cümle sizce kabul edilebilir, günlük konuşmada kullanılabilir bir cümle ise cümleye 6-7 gibi yüksek bir puan verebilirsiniz. Ama eğer size verilen cümle Türkçe için uygun bir cümle değilse 1 veya 2 gibi düşük bir puan verebilirsiniz. Eğer cümle ne çok iyi ne de çok kötü ise 3 veya 4 gibi arada bir puan verebilirsiniz.</p>
            <p>Ayrıca, deney boyunca BAZI cümlelerden sonra bir anlama sorusu gelecek. Soru geldiğinde bir önceki cümleye göre uygun cevabı seçip devam edebilirsiniz. Sorulara doğru cevap vermeniz oldukça önemli, lütfen cümleleri dikkatle okuyun. Deneyin tamamının en fazla 15-20 dakika süreceğini tahmin ediyoruz.</p>
            <p>Deneyi BİLGİSAYARDAN, ARA VERMEDEN ve SESSİZ bir ortamda tamamlayın. </p>
            <p>Bu deneye katılabilmek için Türkçe konuşuyor olmanız, en az 18 yaşında olmanız ve herhangi bir okuma probleminizin olmaması gerekli.</p>
            <p>Bu çalışmaya katılarak anadil çalışmalarına katkıda bulunacaksınız. Çalışmanın sizin gibi katılımcıları sayesinde birinci dil konuşanların dili nasıl öğrendiklerini, algıladıklarını ve kullandıklarını daha iyi anlamayı ümit ediyoruz. Çalışmada yaklaşık olarak 60 katılımcı bulunacak. </p>
            <p>Sizden aldığımız her veri giriş kodu gerektiren kişisel bilgisayarda saklanacak. Bu dokümanlara sadece Özge Bakay erişebilecek. Bu çalışmayla ilgili hiçbir raporda isminiz görünmeyecek. Sizden aldığımız tüm veriler deney sonunda size vereceğimiz kod ile kaydedilecek. Böylelikle veriler her zaman anonim olarak kalacak. Deney verileri akademik platformlarda sadece anonim olarak paylaşılacak ve deney verileriniz ile kişisel verileriniz hiçbir şekilde eşleştirilmeyecek. </p>
            <p>Bu çalışmadaki riskler günlük hayatta karşılaşabileceğiniz risklerden daha fazla değil. Eğer veri toplama esnasında herhangi bir şekilde rahatsızlık hissederseniz prosedürü hemen durdurabilir ve katılımdan vazgeçebilirsiniz. Deneyi yarıda bıraktığınız takdirde o ana kadarki deney verileriniz bilgisayara kaydedilmeyecek ve deneyi yarıda bıraktığınız için herhangi bir yaptırım uygulanmayacak.</p>
            <p>Deneye katılımınız karşılığında <b>150 TL</b> ödeme alacaksınız. Ödeme için deneyi bitirdiğinizde ekranda gözüken kodu not etmeyi ve size gönderdiğimiz formdaki bilgileri doldurmayı unutmayın! Deneyle ilgili herhangi bir problemle karşılaştığınızda ya da sorunuz olduğunda <b>obakay@umass.edu</b> adresine e-posta gönderebilirsiniz.</p>
            <p>Deneye katılmayı kabul ediyorsanız demografik bilgi isteyeceğimiz bir sonraki sayfaya geçmek için aşağıdaki "Devam" butonuna tıklayın.</p>`)
            .css("font-size", "16px")
            .css("font-family", "Helvetica, sans-serif")
            .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    devam("16px")
)

newTrial("intro",
    demog("Age", "Yaşınız:"),
    print_space(1, "intro1"),
    demog("NativeLangauge", "Anadiliniz ya da anadilleriniz:"),
    print_space(1, "intro2"),
    demog("DominantLanguage","Birden fazla anadiliniz varsa kendinizi daha rahat ifade ettiğiniz dil:"),
    print_space(1, "intro3"),    
    demog("ForeignLanguage", "Konuştuğunuz diğer diller:"),
    print_space(1, "intro4"),
    demog("School", "Eğitim durumunuz (lise mezunu, üniversite öğrencisi, üniversite mezunu):"),
    print_space(1, "intro5"),
    ////////////////
    newText("Bilgiler için teşekkürler! Deneye başlamadan önce birkaç alıştırma cümlesi göreceksiniz. Alıştırma cümlelerine geçmek için aşağıdaki butona tıklayın.")
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
        .print()
    ,
    print_space(1, "intro6"),
    devam("16px", "intro")
)

.log("Age", getVar("Age"))
.log("NativeLanguage", getVar("NativeLanguage"))
.log("DominantLanguage", getVar("DominantLanguage"))
.log("ForeignLanguage", getVar("ForeignLanguage"))
.log("School", getVar("School"))

newTrial("practice1",
    print_sentence("Hizmetçi merdiveni duvara yasladı ama bu pek güvenli değildi."),
    print_space(4, "prac1"),
    print_scale(),
    print_space(1, "prac2"),
    devam("24px"),
    print_space(4, "prac3"),
    newText("Örneğin, Türkçe konuşanlar bu cümleye genelde 6 ya da 7 gibi yüksek puanlar veriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    // print_space(1),
    devam("24px", "prac")
)

newTrial("practice2",
print_sentence("Köyü ziyaret eden belediye başkanı asla beğenmiş."),
    print_space(4, "prac21"),
    print_scale(),
    print_space(1, "prac22"),
    devam("24px"),
    print_space(4, "prac23"),
    newText("Örneğin, Türkçe konuşanlar bu cümleye genelde 1 ya da 2 gibi düşük puanlar veriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    print_space(1, "prac24"),
    devam("24px", "prac2")
)

newTrial("practice3",
    print_sentence("Harabeler onarılmaya dün çalışıldı."),
    print_space(4, "prac31"),
    print_scale(),
    print_space(1, "prac32"),
    devam("24px"),
    print_space(4, "prac33"),
    newText("Türkçe konuşanlar bu cümleye 3 ya da 4 gibi arada puanlar veriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    print_space(1, "prac34"),
    devam("24px", "prac3")
)

newTrial("break",
    newText("Alıştırma cümleleri bitti. Hazır olduğunuzda deneye başlamak için aşağıdaki butona tıklayın.")
        .center()
        .print()
        .css(text_css)
    ,
    print_space(2, "break"),
    devam("24px", "break")
)

var trial = (label) => (row) => {

    return newTrial(
        label,
        trialN(),
        print_sentence(row.sentence),
        print_space(4, "trialbase1"),
        print_scale(),
        print_space(1, "trialbase2"),
        devam("24px", "trialbase"),
        
        newVar("is_question", "").set(row.isq),
        getVar("is_question").test.is(1)
            .success(
                clear(),
                newText("questionasked",row.question)
                    .css(text_css)
                    .center()
                    .print()
                    .log(),
                print_space(1, "q1"),
                newVar("is_correct").global().set(false),
                newScale("answer", "Evet", "Hayir")
                    .checkbox()
                    .center()
                    .print()
                    .css(text_css)
                    .vertical()
                    .log(),
                getScale("answer")
                    .test.selected(row.correct_answer)
                    .success(getVar("is_correct").set(true)),
                print_space(1, "q2"),
                newButton("devam" + "q", "Devam")
                    .css(text_css)
                    .center()
                    .print()
                    .wait(getScale("answer").test.selected()),
                getVar("is_correct").set(getVar("is_correct")),
                getVar("correctAnswer").set(row.correct_answer),
            ),
        
        getVar("itemNum").set(row.item),
        getVar("trialNum").set(getVar("TrialN")),
        getVar("type").set(row.type),
        getVar("sentence").set(row.sentence),
        getVar("conj1").set(row.conjunct1),
        getVar("conj2").set(row.conjunct2),
        getVar("condition").set(row.condition),
        getVar("question").set(row.question),
        getVar("is_question").test.is(1)
            .failure(
                getVar("is_correct").set("NA"),
                getVar("correctAnswer").set(row.correct_answer) 
            )
    );
};


Template(
  GetTable("items.csv").filter("type", /filler/),
  trial("filler")
);

Template(
  GetTable("items.csv").filter("type", /exp/),
  trial("exp")
);
