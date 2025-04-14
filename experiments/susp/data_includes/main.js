// TODO: 
// [X] put fillers and exp and practice into same template 
// [X] improve text_css to get a value for fontsize
// [X] 1-6 likert: we should have points with their labels below, I don't think we need actual numbers: labels can be oldukça kötü - kötü - kötü sayılır - iyi sayılır - iyi - oldukça iyi.
// [X] improve overall css for presentation. text should not wrap to the window.
// [X] improve css for the question.
// [X] make sure that question only pops up for some of the trials
// [X] add Latin Square Group
// [X] correct repeating "devam" or "space"
// [X] Edit intro and explanations: DONE
// [X] Header completion
// [X] Create a completion code and ask for that in the google form
// [X] Create a google form after the experient for them to give their email address

PennController.ResetPrefix();
PennController.DebugOff();
PennController.SetCounter("increase")

Sequence("instructions", "demo", "counter", startsWith("practice"), "break", rshuffle("exp", "filler"), "SendResults()", "exit");

var sendingResultsMessage = "Sonuçlarınız gönderiliyor, lütfen bekleyin.";
var randomnumber = Math.floor(Math.random()*1000000);
var completionCode = String("CO" + randomnumber);
var completionMessage = "Sonuçlarınız gönderildi. Deney tamamlama kodunuzu not edip sekmeyi kapatabilirsiniz. Deney tamamlama kodunuz:" + completionCode;
var progressBarText = "Ne kadar kaldı?";
var finallink = "https://forms.gle/uNtV9axnx6EcT81R6";

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
    .log("completionCode", completionCode)
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

var inst_text_css = {
    margin: "0 auto",
    "font-size": "20px",
    "font-family": "sans-serif",
  };

  
var underline_blank = {
    outline: "none",
    resize: "none",
    border: "0",
    padding: "0",
    margin: "0",
    "margin-left": "1ex",
    "margin-right": "1ex",
    "vertical-align": "-.33em",
    "background-color": "white",
    "border-bottom": "2px solid black",
    display: "inline",
};


var button_css = {
    "font-family": "Helvetica, sans-serif",
    // "background-color": "#E03A3E",
    // color: "white",
    "font-size": "1.25em",
    padding: "0.5em",
    "border-radius": "0.25em",
    // "width": "4em",
    margin: "0 auto",
    "text-align": "center",
    border: "none", // Remove default button border
    display: "block", // To center the button
  };

const trialN = () => [
    newVar("TrialN", 0)
        .settings.global()
        .set((v) => v + 1)
];


const newDemo = (label, text) => [
    newTextInput(label)
      .before(newText(text).size("15em", "1.5em"))
      .size("15em", "1.5em")
      .lines(1)
      .css(underline_blank)
      .center()
      .log()
      .print(),
];


const print_sentence = (f) => [
    newText(f)
        .css(text_css)
        .css("margin", "1.5em")
        .css("text-align", "center")
        .settings.size("40em")
        .center()
        .print()
        .log()
];

const print_scale = () => [
    // newText("right", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle")
    //     .css("font-size","14px")
    //     .css("font-family", "Helvetica, sans-serif")
    //     .css("margin-left", "2em")
    //     .css("margin-right", "1em")
    //     .css("margin-top", "2.5em")
    //     .italic()
    // ,
    // newText("left", "Kesinlikle duyabileceğim/söyleyeceğim bir cümle değil")
    //     .css("font-size","14px")
    //     .css("font-family", "Helvetica, sans-serif")
    //     .css("margin-left", "1em")
    //     .css("margin-top", "2.5em")
    //     .italic()
    // ,
    newScale("scale", "oldukça kötü", "kötü", "kötü sayılır", "iyi sayılır", "iyi", "oldukça iyi")
        .radio()
        .labelsPosition("bottom")
        .keys()
        .italic()
        // .before(getText("left"))
        // .after(getText("right"))
        .css("font-size","16px")
        .css("font-family", "Helvetica, sans-serif")
        .css("margin", "30pt")
        .cssContainer("border", "solid 1px black")
        .log()
        .center()
        .print()
        .wait() 
];

const print_space = (n, label = "") => {
    let spaceBlocks = [];
    for (let i = 0; i < n; i++) {
        spaceBlocks.push(newText("Space" + label + "_" + i, " ").print());
    }
    return spaceBlocks;
};


const devam = (fontsize, label) => [
    newButton("devam"+label, "Devam")
        .css(button_css)
        .css("font-size", fontsize)
        .print()
        .wait()
];

    
SetCounter("counter", "inc", 1)

newTrial("instructions",
    defaultText.css(inst_text_css),
    fullscreen(),
    
    newText(`<p>Merhaba! Size internet ortamında yürütülen bir dilbilim deneyi için ulaşıyoruz. Bu deney Massachusetts Üniversitesi Amherst kampüsünden Eva Neu, Özge Bakay ve Maryland Üniversitesi College Park kampüsünden Utku Türk tarafından yürütülüyor. </p>
            <p>Bu deneyde Türkçe konuşanların karmaşık Türkçe cümleleri nasıl anlamlandırdığı hakkında fikir edinmeyi amaçlıyoruz. Bunun için bu deneyde size verilen cümlelerin kabul edilebilir olup olmadığını değerlendirmenizi istiyoruz. </p>
            <p>Bu değerlendirmeyi yaparken size verilen cümleleri öğretilen dilbilgisi kurallarına göre değil, etrafınızdaki kişilerden duyup duymama ihtimalinize ya da kendi Türkçenize uygun bulup bulmamanıza göre karar vermenizi istiyoruz.</p>
            <p>Yani size verilen cümle sizce kabul edilebilir, günlük konuşmada kullanılabilir bir cümle ise cümleye 'iyi' bir puan vermelisiniz. Ama eğer cümle Türkçe için uygun bir cümle değilse 'kötü' bir puan vermelisiniz.</p>
            <p>Detaylı bir değerlendirme yapabilmeniz için ölçekte hem 'iyi' hem de 'kötü' için 3'er farklı derece olacak. Örneğin iyi seçeneği için 'iyi sayılır', 'iyi' ve 'oldukça iyi' seçeneklerini göreceksiniz. Bu seçeneklerden 'iyi sayılır'ı en düşük, 'iyi'yi orta ve 'oldukça iyi'yi en yüksek seviyede kabul edilebilir cümleler için kullanmalısınız. Aynı şekilde 3'lü bir değerlendirme 'kötü' yani sizce kabul edilemez cümleler için de bulunacak. Ölçeği tanımanız için deneyden önce birkaç alıştırma cümlesi yapacasınız. </p>
            <p>Ayrıca, deney boyunca BAZI cümlelerden sonra bir anlama sorusu gelecek. Soru geldiğinde bir önceki cümleye göre uygun cevabı seçip devam edebilirsiniz. Sorulara doğru cevap vermeniz oldukça önemli, lütfen cümleleri dikkatle okuyun. Deneyin tamamının en fazla 30 dakika süreceğini tahmin ediyoruz.</p>
            <p>Deneyi BİLGİSAYARDAN, ARA VERMEDEN ve SESSİZ bir ortamda tamamlayın. </p>
            <p>Bu deneye katılabilmek için Türkçe konuşuyor olmanız, en az 18 yaşında olmanız ve herhangi bir okuma probleminizin olmaması gerekli.</p>
            <p>Bu çalışmaya katılarak anadil çalışmalarına katkıda bulunacaksınız. Çalışmanın sizin gibi katılımcıları sayesinde birinci dil konuşanların dili nasıl öğrendiklerini, algıladıklarını ve kullandıklarını daha iyi anlamayı ümit ediyoruz. Çalışmada yaklaşık olarak 60 katılımcı bulunacak. </p>
            <p>Sizden aldığımız her veri giriş kodu gerektiren kişisel bilgisayarda saklanacak. Bu dokümanlara sadece deney yürütücüleri erişebilecek. Bu çalışmayla ilgili hiçbir raporda isminiz görünmeyecek. Sizden aldığımız tüm veriler deney sonunda size vereceğimiz kod ile kaydedilecek. Böylelikle veriler her zaman anonim olarak kalacak. Deney verileri akademik platformlarda sadece anonim olarak paylaşılacak ve deney verileriniz ile kişisel verileriniz hiçbir şekilde eşleştirilmeyecek. </p>
            <p>Bu çalışmadaki riskler günlük hayatta karşılaşabileceğiniz risklerden daha fazla değil. Eğer veri toplama esnasında herhangi bir şekilde rahatsızlık hissederseniz prosedürü hemen durdurabilir ve katılımdan vazgeçebilirsiniz. Deneyi yarıda bıraktığınız takdirde o ana kadarki deney verileriniz bilgisayara kaydedilmeyecek ve deneyi yarıda bıraktığınız için herhangi bir yaptırım uygulanmayacak.</p>
            <p>Deneye katılımınız karşılığında <b>175 TL</b> değerinde bir hediye çeki alacaksınız. Ödeme için deneyi bitirdiğinizde ekranda gözüken 'deney tamamlama kodu'nu mutlaka kaydedin. Daha sonra bir Google Forms'a bu kodu ve e-posta adresinizi yazmanızı isteyeceğiz. Siz bu formu tamamladıktan sonra hediye çekinizi ve çekin kullanım detaylarını e-posta adresinize göndereceğiz. Deneyle ilgili herhangi bir problemle karşılaştığınızda ya da sorunuz olduğunda <b>utkuturk@umd.edu</b> adresine e-posta gönderebilirsiniz.</p>
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


newTrial(
    "demo",
    defaultText.css(inst_text_css),
    newDemo("age", "Yaşınız*:"),
    ...print_space(1, "intro1"),
    newDemo("language", "Anadil(ler)iniz*:"),
    ...print_space(1, "intro1"),
    newDemo("otherlg", "Konuştuğunuz diğer diller:"),
    ...print_space(1, "intro1"),
    newDemo("school", "Eğitim durumunuz:"),
    
    ...print_space(3, "intro6"),

    newText("Bilgiler için teşekkürler! Deneye başlamadan önce birkaç alıştırma cümlesi göreceksiniz. Alıştırma cümlelerine geçmek için aşağıdaki butona tıklayın.")
        .print()
    ,
    ...print_space(3, "intro6"),
    newButton("devam"+"demo", "Devam")
        .css("font-size", "16px")
        .css(button_css)
        .print()
        .wait(
            getTextInput("age")
                .test.text(/^\d+.+$/)
                .failure(
                    newText("Lütfen yaşınızı sayı ile giriniz.").settings.color("red").print()
                )
            .and(
                getTextInput("language")
                .testNot.text("")
                .failure(
                    newText("Lütfen anadilinizi ya da ana dillerinizi giriniz.")
                    .settings.color("red")
                    .print()
                )
            )
        ),
  );

newTrial("practice1",
    print_sentence("Hizmetçi merdiveni duvara yasladı ama bu pek güvenli değildi."),
    ...print_space(4, "prac1"),
    print_scale(),
    ...print_space(1, "prac2"),
    devam("24px"),
    ...print_space(4, "prac3"),
    newText("Örneğin, Türkçe konuşanlar bu cümleyi genelde kabul edilebilir buluyor ve 'oldukça iyi' veya 'iyi' şeklinde değerlendiriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    ...print_space(1),
    devam("24px", "prac")
)

newTrial("practice2",
print_sentence("Köyü ziyaret eden belediye başkanı asla beğenmiş."),
    ...print_space(4, "prac21"),
    print_scale(),
    ...print_space(1, "prac22"),
    devam("24px"),
    ...print_space(4, "prac23"),
    newText("Önceki cümlenin aksine, Türkçe konuşanlar bu cümleyi genelde kabul edilemez buluyor ve 'oldukça kötü' ya da 'kötü' şeklinde değerlendiriyor.")
        .css(text_css)
        .center()
        .print()
    ,
    ...print_space(1, "prac24"),
    devam("24px", "prac2")
)

newTrial("practice3",
    print_sentence("Harabeler onarılmaya dün çalışıldı."),
    ...print_space(4, "prac31"),
    print_scale(),
    ...print_space(1, "prac32"),
    devam("24px"),
    ...print_space(4, "prac33"),
    newText("Türkçe konuşanlar bu cümleyi çok çok iyi ya da kabul edilebilir bulmuyor ve 'iyi sayılır' gibi düşük seviyede bir değerlendirme yapıyor.")
        .css(text_css)
        .center()
        .print()
    ,
    ...print_space(1, "prac34"),
    devam("24px", "prac3")
)

newTrial("break",
    newText("Alıştırma cümleleri bitti. Hazır olduğunuzda deneye başlamak için aşağıdaki butona tıklayın.")
        .center()
        .print()
        .css(text_css)
    ,
    ...print_space(2, "break"),
    devam("24px", "break")
)

var trial = (label) => (row) => {

    return newTrial(
        label,
        trialN(),
        print_sentence(row.sentence),
        ...print_space(4, "trialbase1"),
        print_scale(),
        ...print_space(1, "trialbase2"),
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
                ...print_space(1, "q1"),
                newVar("is_correct").global().set(false),
                newScale("answer", "Evet", "Hayir")
                    .checkbox()
                    .center()
                    .print()
                    .css(text_css)
                    // .horizontal()
                    .log(),
                getScale("answer")
                    .test.selected(row.correct_answer)
                    .success(getVar("is_correct").set(true)),
                ...print_space(1, "q2"),
                newButton("devam" + "q", "Devam")
                    .css(button_css)
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



newTrial(
    "exit",
    exitFullscreen(),
    newText(
      "exit-text-ling",
      "<center><b>Çalışmamıza katıldığınız için teşekkür ederiz!</b></center><br><br>" +
        "<p>Lütfen aşağıdaki tamamlanma kodunu üstüne tıklayarak kopyalayınız: " + completionCode + 
        "<p>Katılımınızı onaylamak için aşağıdaki 'BİTİR' butonuna tıklayabilirsiniz." +
        "<p>Bu sizi bir Google Form sayfasına yönlendirecek. Bu sayfada sizden bu tamamlanma kodunu ve e-posta adresinizi girmeniz istenecek, böylece seçtiğiniz hediye kartını size iletebiliriz."
    ).css(text_css).print(),
    newButton("   END   ").bold().css(button_css).print().wait(),
    getText("exit-text-ling").remove(),
    newHtml(
        "ling_debrief",
        "<!DOCTYPE html><meta http-equiv='refresh' content='0; url=" +
        finallink +
          "'>Deney sona erdi ve cevaplarınız sunucuya gönderildi.<br />Hediye kartı için gerekli bilgileri doldurmak için <a href = '" +
          finallink +
          "'>bu bağlantıya tıklayın</a> ve yönergeleri izleyin."
      )
        .print()
        .wait()
      
  );