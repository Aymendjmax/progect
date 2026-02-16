import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  BookOpen,
  Users,
  Target,
  Lightbulb,
  Heart,
  ArrowUp,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// بيانات الشرائح
const slidesBaseUrl = `${import.meta.env.BASE_URL}slides`;
const slides = [
  { id: 1, image: `${slidesBaseUrl}/slide_1_1.png`, title: 'صراع الأجيال: حتمية التغيير وضمان الاستمرارية' },
  { id: 2, image: `${slidesBaseUrl}/slide_2_1.png`, title: 'أسباب الصراع: التقنية والفجوة الرقمية' },
  { id: 3, image: `${slidesBaseUrl}/slide_3_1.png`, title: 'أسباب الصراع: القيم والتحولات الفكرية' },
  { id: 4, image: `${slidesBaseUrl}/slide_4_1.png`, title: 'أسباب الصراع: الاقتصاد والضغوط المعيشية' },
  { id: 5, image: `${slidesBaseUrl}/slide_5_1.png`, title: 'تأثير الصراع على المجتمع والمؤسسات' },
  { id: 6, image: `${slidesBaseUrl}/slide_6_1.png`, title: 'الحلول والتوصيات: من الصراع إلى التكامل' },
  { id: 7, image: `${slidesBaseUrl}/slide_7_1.png`, title: 'فريق العمل' },
];

// أقسام البحث
const researchSections = [
  {
    id: 1,
    number: '01',
    title: 'المقدمة: المفهوم والديناميكية الاجتماعية',
    icon: BookOpen,
    content: `يُعرف الصراع الجيلي (Generation Gap) سوسيولوجياً بأنه التباين في القيم، والمعتقدات، وأنماط السلوك بين فئات عمرية تشاركت في تجارب تاريخية معينة. يرى علماء الاجتماع، مثل كارل مانهايم، أن الجيل ليس مجرد "عمر بيولوجي"، بل هو "وحدة اجتماعية" تتشكل هويتها من خلال أحداث كبرى (مثل الثورات التقنية أو الحروب) تعيشها في مرحلة الشباب.`,
    highlight: 'هذا الصراع ليس سلبياً بالضرورة، بل هو "محرك للتطور"؛ فالمجتمعات التي لا تشهد صراعاً بين القديم والجديد تصاب بالركود والجمود الثقافي.'
  },
  {
    id: 2,
    number: '02',
    title: 'الجذور العميقة وأسباب اتساع الفجوة',
    icon: Lightbulb,
    points: [
      {
        title: 'التسارع التقني',
        desc: 'المواطنون الرقميون مقابل المهاجرين - يعيش العالم ما يسمى "السرعة الاجتماعية الفائقة"؛ حيث وُلد الشباب في عالم رقمي بالفطرة، بينما يحاول الكبار "الهجرة" إليه وتعلّمه.'
      },
      {
        title: 'التحول من "المادية" إلى "ما بعد المادية"',
        desc: 'يميل الجيل القديم إلى تقديس الأمن الوظيفي والاستقرار المادي، بينما يبحث الشباب عن "المعنى"، وحرية التعبير، والعدالة الاجتماعية.'
      },
      {
        title: 'تآكل السلطة المعرفية',
        desc: 'في الماضي، كان الكبار هم المصدر الوحيد للحكمة. اليوم، يثق الشباب في "المصادر الرقمية" والذكاء الاصطناعي أكثر من نصائح الأقدمين.'
      },
      {
        title: 'الضغوط الاقتصادية وتنازع الموارد',
        desc: 'يواجه الشباب اليوم تحديات في الاستقلال المادي (بطالة، تضخم) تختلف عما واجهه الكبار في "عصرهم الذهبي".'
      }
    ]
  },
  {
    id: 3,
    number: '03',
    title: 'تأثير الصراع على بنية المجتمع والمؤسسات',
    icon: Users,
    points: [
      {
        title: 'داخل الأسرة (ارتباك الهوية)',
        desc: 'يؤدي غياب الحوار إلى "القطيعة الاجتماعية"؛ حيث ينعزل الأبناء في عالمهم الافتراضي بحثاً عن هويات بديلة، بينما يشعر الآباء بالاغتراب داخل بيوتهم.'
      },
      {
        title: 'في بيئة العمل (تراجع الإنتجاعية)',
        desc: 'تشير الإحصاءات إلى أن 70% من الشركات تواجه صعوبات في إدارة التواصل بين الأجيال. غياب الاحترام المتبادل للاختلافات قد يعطل الإبداع.'
      },
      {
        title: 'تراجع دور القدوة التقليدية',
        desc: 'في المدارس، لم يعد المعلم المصدر الوحيد للقيم، حيث أصبح "المؤثرون" الرقميون منافسين أقوياء في تشكيل أخلاقيات الطلاب وسلوكهم.'
      }
    ]
  },
  {
    id: 4,
    number: '04',
    title: 'رؤية استراتيجية للحلول والتوصيات',
    icon: Target,
    points: [
      {
        title: 'تفعيل "التعلم المشترك" (Mutual Learning)',
        desc: 'يجب كسر قالب (المعلم والمتعلم). الحل يكمن في تبادل الأدوار؛ الكبار ينقلون "الحكمة والخبرة الحياتية"، والشباب يعلّمون الكبار "المهارات التقنية والابتكار".'
      },
      {
        title: 'الاستثمار في "رأس المال الجيلي"',
        desc: 'إشراك الشباب في صنع القرار ليس رفاهية، بل هو وسيلة لضمان أن تكون القوانين والسياسات مواكبة للمستقبل، مع الاسترشاد بـ "رزانة الكبار" لضمان الاستقرار.'
      },
      {
        title: 'تبني "العيش المشترك" والمواطنة',
        desc: 'ترسيخ قيم قبول الاختلاف كعنصر "إثراء ثقافي" وليس تهديداً. يجب إنشاء مساحات عامة تجمع الأجيال في أنشطة تطوعية أو ثقافية مشتركة.'
      },
      {
        title: 'تطوير آليات التواصل',
        desc: 'استخدام أدوات العصر الرقمي للتقريب بين الأجيال، مثل مبادرات "التوجيه العكسي" في المؤسسات، وتعزيز ثقافة الاستماع الفعال.'
      }
    ]
  },
  {
    id: 5,
    number: '05',
    title: 'الخاتمة: حوار لا صدام',
    icon: Heart,
    content: `إن صراع الأجيال هو في جوهره "جدلية بين الأصالة والمعاصرة". المجتمع الناجح ليس هو الذي ينتصر فيه جيل على آخر، بل هو المجتمع الذي يبني "جسوراً" تمكنه من العبور نحو المستقبل دون التفريط في جذوره القيمية.`,
    highlight: 'إن التغيير ضرورة لبقاء القيم حية، والجمود هو الخطر الحقيقي الذي يهدد استمرارية الحضارة؛ فالمستقبل يُبنى بـ "حماسة الشباب" ويُحمى بـ "حكمة الشيوخ".'
  }
];

// فريق العمل
const teamMembers = [
  'جيلالي أيمن',
  'اوشيش ايناس',
  'بوعلام فاطمة',
  'بن اكساس ألاء و اسراء',
  'عطار زكريا'
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // مراقبة التمرير
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // تحديد القسم النشط
      const sections = ['home', 'slides', 'video', 'research', 'footer'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // التنقل بين الشرائح
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // التمرير للأعلى
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // التمرير لقسم معين
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419] text-[#f5e6c8] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0f1419]/80 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#20b2aa] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#0f1419]" />
              </div>
              <span className="font-bold text-lg hidden sm:block">صراع الأجيال</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'slides', label: 'الشرائح' },
                { id: 'video', label: 'الفيديو' },
                { id: 'research', label: 'البحث' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#20b2aa]/20 text-[#d4af37]'
                      : 'text-[#f5e6c8]/70 hover:text-[#f5e6c8] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#d4af37]/20 bg-[#0f1419]/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-2">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'slides', label: 'الشرائح' },
                { id: 'video', label: 'الفيديو' },
                { id: 'research', label: 'البحث' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-right px-4 py-3 rounded-lg text-[#f5e6c8]/80 hover:bg-white/5 hover:text-[#d4af37] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#20b2aa]/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#d4af37]/5 to-transparent rounded-full" />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#20b2aa]/10 border border-[#d4af37]/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-sm font-medium text-[#d4af37]">بحث علمي معمق</span>
          </div>
          
          {/* Title */}
          <h1 className="heading-xl mb-6">
            <span className="block text-[#f5e6c8]">صراع الأجيال</span>
            <span className="block gradient-text mt-2">حتمية التغيير وضمان الاستمرارية</span>
          </h1>
          
          {/* Description */}
          <p className="body-lg text-[#f5e6c8]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            استكشاف عميق للديناميكية الاجتماعية بين الأجيال، وتحليل أسباب الصراع، 
            وتأثيره على المجتمع، مع رؤية استراتيجية للحلول والتوصيات.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => scrollToSection('slides')}
              className="group px-8 py-6 text-lg font-bold bg-gradient-to-r from-[#d4af37] to-[#20b2aa] text-[#0f1419] rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              <span>استكشف الشرائح</span>
              <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('research')}
              variant="outline"
              className="px-8 py-6 text-lg font-medium border-[#d4af37]/50 text-[#f5e6c8] rounded-xl hover:bg-[#d4af37]/10 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 ml-2" />
              <span>اقرأ البحث</span>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '7', label: 'شرائح تفاعلية' },
              { value: '5', label: 'أقسام بحثية' },
              { value: '5', label: 'أعضاء الفريق' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-[#f5e6c8]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* Slides Section */}
      <section id="slides" className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20b2aa]/10 border border-[#20b2aa]/30 mb-4">
              <Lightbulb className="w-4 h-4 text-[#20b2aa]" />
              <span className="text-sm font-medium text-[#20b2aa]">العرض التقديمي</span>
            </div>
            <h2 className="heading-lg text-[#f5e6c8] mb-4">شرائح البحث</h2>
            <p className="text-[#f5e6c8]/60 max-w-xl mx-auto">
              استعرض الشرائح التفاعلية للاطلاع على محتوى البحث بشكل مرئي وجذاب
            </p>
          </div>
          
          {/* Slider */}
          <div className="relative">
            {/* Main Slide */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] border border-[#d4af37]/20 shadow-2xl">
              {/* Slide Image */}
              <div className="relative aspect-video">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain bg-gradient-to-br from-[#1a1f2e] to-[#0f1419]"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419]/80 via-transparent to-transparent" />
                
                {/* Slide Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-sm font-medium">
                      شريحة {currentSlide + 1} من {slides.length}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f5e6c8]">
                    {slides[currentSlide].title}
                  </h3>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0f1419]/80 backdrop-blur-sm border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f1419] transition-all duration-300 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0f1419]/80 backdrop-blur-sm border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f1419] transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="mt-6 flex justify-center gap-2 flex-wrap">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    idx === currentSlide
                      ? 'border-[#d4af37] scale-110 shadow-lg shadow-[#d4af37]/20'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6 h-1 bg-[#1a1f2e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#20b2aa] transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="section-padding relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4">
              <Play className="w-4 h-4 text-[#d4af37]" />
              <span className="text-sm font-medium text-[#d4af37]">الفيديو التوضيحي</span>
            </div>
            <h2 className="heading-lg text-[#f5e6c8] mb-4">شاهد العرض المرئي</h2>
            <p className="text-[#f5e6c8]/60 max-w-xl mx-auto">
              شاهد الفيديو التوضيحي للبحث
            </p>
          </div>
          
          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] border border-[#d4af37]/20 shadow-2xl">
            {/* Video Element */}
            <div className="aspect-video">
              <video
                src="https://c.top4top.io/m_3698uvxhb1.mp4"
                controls
                className="w-full h-full"
                poster="/slides/slide_1_1.png"
              >
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </div>
          
          {/* Video Info */}
          <div className="mt-6 p-6 rounded-xl bg-[#1a1f2e]/50 border border-[#d4af37]/10">
            <h4 className="font-bold text-[#f5e6c8] mb-2">عنوان الفيديو</h4>
            <p className="text-[#f5e6c8]/60 text-sm">
              صراع الأجيال: حتمية التغيير وضمان الاستمرارية - عرض مرئي توضيحي
            </p>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="section-padding relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4">
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              <span className="text-sm font-medium text-[#d4af37]">البحث العلمي</span>
            </div>
            <h2 className="heading-lg text-[#f5e6c8] mb-4">بحث معمق: صراع الأجيال</h2>
            <p className="text-[#f5e6c8]/60 max-w-2xl mx-auto">
              دراسة تحليلية شاملة لظاهرة الصراع الجيلي، أسبابها، تأثيراتها، والحلول المقترحة
            </p>
          </div>
          
          {/* Research Content */}
          <div className="space-y-8">
            {researchSections.map((section) => (
              <div
                key={section.id}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all duration-500"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/0 to-[#20b2aa]/0 group-hover:from-[#d4af37]/10 group-hover:via-[#d4af37]/5 group-hover:to-[#20b2aa]/10 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                
                <div className="relative p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Number */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#20b2aa]/20 border border-[#d4af37]/30 flex items-center justify-center">
                      <span className="text-xl font-bold gradient-text">{section.number}</span>
                    </div>
                    
                    {/* Title */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <section.icon className="w-5 h-5 text-[#20b2aa]" />
                        <h3 className="text-xl sm:text-2xl font-bold text-[#f5e6c8]">{section.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="pr-0 sm:pr-18">
                    {section.content && (
                      <p className="body-md text-[#f5e6c8]/80 mb-4 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    
                    {section.highlight && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#d4af37]/10 to-[#20b2aa]/10 border-r-4 border-[#d4af37]">
                        <p className="text-[#f5e6c8] font-medium italic">
                          &quot;{section.highlight}&quot;
                        </p>
                      </div>
                    )}
                    
                    {section.points && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {section.points.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="p-4 rounded-xl bg-[#0f1419]/50 border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors"
                          >
                            <h4 className="font-bold text-[#d4af37] mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#20b2aa]" />
                              {point.title}
                            </h4>
                            <p className="text-sm text-[#f5e6c8]/70 leading-relaxed">
                              {point.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="relative border-t border-[#d4af37]/20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1419] to-[#080a0f]" />
        
        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="section-padding">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 lg:grid-cols-3">
                {/* Goal */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#20b2aa] flex items-center justify-center">
                      <Target className="w-5 h-5 text-[#0f1419]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#f5e6c8]">هدف الموقع</h3>
                  </div>
                  <p className="text-lg text-[#f5e6c8]/80 leading-relaxed pr-13">
                    هدف هذا الموقع هو نشر معلومات تستحق أن تكون للعالم أجمع. نؤمن بأن المعرفة 
                    يجب أن تكون متاحة للجميع، وأن الحوار البنّاد بين الأجيال هو مفتاح 
                    بناء مجتمعات متقدمة ومتماسكة.
                  </p>
                </div>
                
                {/* Team */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#20b2aa] to-[#d4af37] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#0f1419]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#f5e6c8]">فريق العمل</h3>
                  </div>
                  <ul className="space-y-2">
                    {teamMembers.map((member, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-[#f5e6c8]/80"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-xs text-[#d4af37] font-medium">
                          {idx + 1}
                        </span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-[#d4af37]/10 py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[#f5e6c8]/50">
                  تم تصميم الموقع بواسطة <span className="text-[#d4af37] font-medium">أيمن</span> نفسه.
                </p>
                <p className="text-sm text-[#f5e6c8]/50">
                  © 2025 صراع الأجيال - جميع الحقوق محفوظة
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#20b2aa] text-[#0f1419] flex items-center justify-center shadow-lg shadow-[#d4af37]/20 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;
