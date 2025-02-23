// TODO: 
// [ ] put fillers and exp and practice into same template 
// [ ] improve text_css to get a value for fontsize
// [ ] include yes/no + likert
// [ ] improve overall css for presentation. text should not wrap to the window.
// [ ] improve css for the question.

PennController.ResetPrefix();
PennController.DebugOff();
PennController.SetCounter("increase")

Sequence("instructions", "intro", "counter", startsWith("practice"), "break", rshuffle("materials", "fillers"), "SendResults()");

var sendingResultsMessage = "Sonuçlarınız gönderiliyor, lütfen bekleyin.";
var randomnumber = Math.floor(Math.random()*1000000);
var completionCode = String("CO" + randomnumber);
var completionMessage = "Sonuçlarınız gönderildi. Deney tamamlama kodunuzu not edip sekmeyi kapatabilirsiniz. Deney tamamlama kodunuz:" + completionCode;
var progressBarText = "Ne kadar kaldı?";


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

const print_space = (n) => {
    let spaceString = "";
    for (let i = 0; i < n; i++) {
      spaceString += "<p> </p>";
    }
    return [
      newText("Space", spaceString)
        .print()
    ];
  };

const devam = (fontsize) => [
    newButton("Devam")
        .css("font-size",fontsize)
        .css("font-family", "Helvetica, sans-serif")
        .print()
        .wait()
];

Header(
  // ...
)
    .log("completionCode", completionCode)
    
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
    print_space(1),
    demog("NativeLangauge", "Anadiliniz ya da anadilleriniz:"),
    print_space(1),
    demog("DominantLanguage","Birden fazla anadiliniz varsa kendinizi daha rahat ifade ettiğiniz dil:"),
    print_space(1),    
    demog("ForeignLanguage", "Konuştuğunuz diğer diller:"),
    print_space(1),
    demog("School", "Eğitim durumunuz (lise mezunu, üniversite öğrencisi, üniversite mezunu):"),
    print_space(1),
    ////////////////
    newText("Bilgiler için teşekkürler! Deneye başlamadan önce birkaç alıştırma cümlesi göreceksiniz. Alıştırma cümlelerine geçmek için aşağıdaki butona tıklayın.")
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
        .print()
    ,
    print_space(1),
    devam("16px")
)

.log("Age", getVar("Age"))
.log("NativeLanguage", getVar("NativeLanguage"))
.log("DominantLanguage", getVar("DominantLanguage"))
.log("ForeignLanguage", getVar("ForeignLanguage"))
.log("School", getVar("School"))

newTrial("practice1",
    print_sentence("Hizmetçi merdiveni duvara yasladı ama bu pek güvenli değildi."),
    print_space(4),
    print_scale(),
    print_space(1),
    devam("24px"),
    print_space(4),
    newText("Örneğin, Türkçe konuşanlar bu cümleye genelde 6 ya da 7 gibi yüksek puanlar veriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    print_space(1),
    devam("24px")
)

newTrial("practice2",
print_sentence("Köyü ziyaret eden belediye başkanı asla beğenmiş."),
    print_space(4),
    print_scale(),
    print_space(1),
    devam("24px"),
    print_space(4),
    newText("Örneğin, Türkçe konuşanlar bu cümleye genelde 1 ya da 2 gibi düşük puanlar veriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    print_space(1),
    devam("24px")
)

newTrial("practice3",
    print_sentence("Harabeler onarılmaya dün çalışıldı."),
    print_space(4),
    print_scale(),
    print_space(1),
    devam("24px"),
    print_space(4),
    newText("Türkçe konuşanlar bu cümleye 3 ya da 4 gibi arada puanlar veriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    print_space(1),
    devam("24px")
)

newTrial("break",
    newText("Alıştırma cümleleri bitti. Hazır olduğunuzda deneye başlamak için aşağıdaki butona tıklayın.")
        .center()
        .print()
        .css(text_css)
    ,
    print_space(2),
    devam("24px")
)

Template("experimental.csv", row =>
    newTrial("materials",
        trialN(),
        print_sentence(row.Sentence),
        print_space(4),
        print_scale(),
        print_space(1),
        devam("24px")
)
    .log("group", row.Group)
    .log("item", row.Item)
    .log("condition", row.Condition)
    .log("itemType", row.Item_type)
    .log("conjunctType", row.ConjunctType)
    .log("conjunctOrder", row.ConjunctOrder)
    .log("agreement", row.Agreement)
    .log("sentence", row.Sentence)
    .log("verb", row.Verb)
)

Template("fillers.csv", row =>
    newTrial("fillers",
        trialN(),
        print_sentence(row.Sentence),
        print_space(4),
        print_scale(),
        print_space(1),
        devam("24px"),
        clear(),
        print_sentence(row.Question),
        print_space(1),
        newScale("answer", row.Answer1, row.Answer2)
            .checkbox()
            .center()
            .print()
            .css(text_css)
            .vertical()
            .log()
            ,
        print_space(1),
        newButton("Devam")
            .css(text_css)
            .center()
            .print()
            .wait( getScale("answer").test.selected() ) 
)
    .log("group", row.Group)
    .log("item", row.Item)
    .log("condition", row.Condition)
    .log("itemType", row.Item_type)
    .log("conjunctType", row.ConjunctType)
    .log("conjunctOrder", row.ConjunctOrder)
    .log("agreement", row.Agreement)
    .log("sentence", row.Sentence)
    .log("verb", row.Verb)
    .log("question", row.Question)
    .log("answer1", row.Answer1)
    .log("answer2", row.Answer2)
    .log("correctAnswer", row.CorrectAnswer)
)
