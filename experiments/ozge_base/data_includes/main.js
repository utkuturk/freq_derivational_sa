PennController.ResetPrefix();
PennController.DebugOff();
PennController.SetCounter("increase")

Sequence("instructions", "intro", "counter", "practice1", "practice2", "practice3", "break", rshuffle("materials", "fillers"), "SendResults()");

var sendingResultsMessage = "Sonuçlarınız gönderiliyor, lütfen bekleyin.";
var randomnumber = Math.floor(Math.random()*1000000);
var completionCode = String("CO" + randomnumber);
var completionMessage = "Sonuçlarınız gönderildi. Deney tamamlama kodunuzu not edip sekmeyi kapatabilirsiniz. Deney tamamlama kodunuz:" + completionCode;
var progressBarText = "Ne kadar kaldı?";

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
    newButton("Devam")
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
        .print()
        .wait()
)

newTrial("intro",
    newTextInput("Age", "")
        .before(newText("Yaşınız:").css("font-size","16px").css("font-family", "Helvetica, sans-serif"))
        .css("font-size","16px")
        .log()
        .lines(1)
        .print()
    ,
    newVar("Age").global().set(getTextInput("Age"))
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newTextInput("NativeLanguage", "")
        .before(newText("Anadiliniz ya da anadilleriniz:").css("font-size","16px").css("font-family", "Helvetica, sans-serif"))
        .css("font-size","16px")
        .log()
        .lines(1)
        .print()
    ,
    newVar("NativeLanguage").global().set(getTextInput("NativeLanguage"))
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newTextInput("DominantLanguage", "")
        .before(newText("Birden fazla anadiliniz varsa kendinizi daha rahat ifade ettiğiniz dil:").css("font-size","16px").css("font-family", "Helvetica, sans-serif"))
        .css("font-size","16px")
        .log()
        .lines(1)
        .print()
    ,
    newVar("DominantLanguage").global().set(getTextInput("DominantLanguage"))
    ,
    newText("Space","</p> </p>")
            .print()
    ,
    newTextInput("ForeignLanguage", "")
        .before(newText("Konuştuğunuz diğer diller:").css("font-size","16px").css("font-family", "Helvetica, sans-serif"))
        .css("font-size","16px")
        .log()
        .lines(1)
        .print()
    ,
    newVar("ForeignLanguage").global().set(getTextInput("ForeignLanguage"))
    ,
    newText("Space","</p> </p>")
            .print()
    ,
    newTextInput("School", "")
        .before(newText("Eğitim durumunuz (lise mezunu, üniversite öğrencisi, üniversite mezunu):").css("font-size","16px").css("font-family", "Helvetica, sans-serif"))
        .css("font-size","16px")
        .log()
        .lines(1)
        .print()
    ,
    newVar("School").global().set(getTextInput("School"))
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Bilgiler için teşekkürler! Deneye başlamadan önce birkaç alıştırma cümlesi göreceksiniz. Alıştırma cümlelerine geçmek için aşağıdaki butona tıklayın.")
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
        .print()
        .wait()
)

.log("Age", getVar("Age"))
.log("NativeLanguage", getVar("NativeLanguage"))
.log("DominantLanguage", getVar("DominantLanguage"))
.log("ForeignLanguage", getVar("ForeignLanguage"))
.log("School", getVar("School"))

newTrial("practice1",
    newText("Hizmetçi merdiveni duvara yasladı ama bu pek güvenli değildi.")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .log()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newScale(7)
        .radio()
        .labelsPosition("bottom") //, we can delete this if we don't want the numbers as labels
        .before( newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
        .after( newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .log()
        .center()
        .print()
        .wait() //global_z.css file in the aesthetics to change the space between the points
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait() 
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Örneğin, Türkçe konuşanlar bu cümleye genelde 6 ya da 7 gibi yüksek puanlar veriyor.")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait()
)

newTrial("practice2",
    newText("Köyü ziyaret eden belediye başkanı asla beğenmiş.")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .log()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newScale(7)
        .radio()
        .labelsPosition("bottom") //we can delete this if we don't want the numbers as labels
        .before( newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
        .after( newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .log()
        .center()
        .print()
        .wait() //global_z.css file in the aesthetics to change the space between the points
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait() 
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Örneğin, Türkçe konuşanlar bu cümleye genelde 1 ya da 2 gibi düşük puanlar veriyor.")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait()
)

newTrial("practice3",
    newText("Harabeler onarılmaya dün çalışıldı.")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .log()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newScale(7)
        .radio()
        .labelsPosition("bottom") //we can delete this if we don't want the numbers as labels
        .before( newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
        .after( newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .log()
        .center()
        .print()
        .wait() //global_z.css file in the aesthetics to change the space between the points
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait() 
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Türkçe konuşanlar bu cümleye 3 ya da 4 gibi arada puanlar veriyor.")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait()
)

newTrial("break",
    newText("Alıştırma cümleleri bitti. Hazır olduğunuzda deneye başlamak için aşağıdaki butona tıklayın.")
        .center()
        .print()
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newText("Space","</p> </p>")
        .print()
    ,
    newButton("Devam")
        .css("font-size","24px")
        .css("font-family", "Helvetica, sans-serif")
        .center()
        .print()
        .wait()
)

Template("experimental.csv", row =>
    newTrial("materials",
        newText("sentence", row.Sentence)
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .center()
            .print()
            .log()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newScale(7)
            .radio()
            .labelsPosition("bottom")//, we can delete this if we don't want the numbers as labels
            .before( newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
            .after( newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .log()
            .center()
            .print()
            .wait() //global_z.css file in the aesthetics to change the space between the points
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newButton("Devam")
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .center()
            .print()
            .wait()
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
        newText("sentence", row.Sentence)
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .center()
            .print()
            .log()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newScale(7)
            .radio()
            .labelsPosition("bottom")//, we can delete this if we don't want the numbers as labels
            .before( newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
            .after( newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle").css("font-size","20px").css("font-family", "Helvetica, sans-serif").italic() )
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .log()
            .center()
            .print()
            .wait() //global_z.css file in the aesthetics to change the space between the points
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newButton("Devam")
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .center()
            .print()
            .wait()
        ,
        clear()
        ,
        newText("question", row.Question)
            .center()
            .print()
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
        ,
        newText("Space","</p> </p>")
            .print()
        ,
        newScale("answer", row.Answer1, row.Answer2)
            .checkbox()
            .center()
            .print()
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
            .vertical()
            .log()
            ,
        newText("Space","</p> </p>")
            .print()
            ,
        newButton("Devam")
            .css("font-size","24px")
            .css("font-family", "Helvetica, sans-serif")
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
