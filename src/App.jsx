import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, Star, Check, ArrowRight, ShieldCheck, 
  Truck, RefreshCw, Sparkles, X, Plus, Minus, Tag, CreditCard, 
  QrCode, FileText, ChevronRight, Sliders, Ruler, MessageCircle, 
  Info, Eye, Share2, Layers, HelpCircle, ChevronDown, CheckCircle2,
  Award, Feather, Compass, ArrowLeft, ArrowUpRight, Volume2, VolumeX,
  Play, Pause
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, REVIEWS, STORE_CONFIG, generateWhatsAppLink } from './data/products';

export default function App() {
  // Navigation & Category States
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Video Reels States (3 Reels: Muted by default for Autoplay compliance, toggleable by button)
  const [reelsMuted, setReelsMuted] = useState([true, true, true]);
  const [reelsPlaying, setReelsPlaying] = useState([true, true, true]);
  const [reelsLikes, setReelsLikes] = useState([1420, 980, 2150]);
  const [reelsLiked, setReelsLiked] = useState([false, false, false]);

  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  const toggleReelMute = (index) => {
    setReelsMuted(prev => {
      const copy = [...prev];
      const newMutedState = !copy[index];
      copy[index] = newMutedState;
      if (videoRefs[index].current) {
        videoRefs[index].current.muted = newMutedState;
      }
      addToast(newMutedState ? 'Áudio desativado 🔇' : 'Áudio ativado 🔊');
      return copy;
    });
  };

  const toggleReelPlay = (index) => {
    const video = videoRefs[index].current;
    if (video) {
      if (video.paused) {
        video.play();
        setReelsPlaying(prev => { const copy = [...prev]; copy[index] = true; return copy; });
      } else {
        video.pause();
        setReelsPlaying(prev => { const copy = [...prev]; copy[index] = false; return copy; });
      }
    }
  };

  const toggleReelLike = (index) => {
    setReelsLiked(prev => {
      const copy = [...prev];
      const isCurrentlyLiked = copy[index];
      copy[index] = !isCurrentlyLiked;

      setReelsLikes(prevLikes => {
        const copyLikes = [...prevLikes];
        copyLikes[index] += isCurrentlyLiked ? -1 : 1;
        return copyLikes;
      });

      addToast(!isCurrentlyLiked ? 'Você curtiu o Reel! ❤️' : 'Descurtido');
      return copy;
    });
  };

  // Scroll Listener for Dynamic Glass Navbar Position Switch
  const [scrollPassedHero, setScrollPassedHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrollPassedHero(true);
      } else {
        setScrollPassedHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Campaign Slide Index
  const [heroIndex, setHeroIndex] = useState(0);
  const heroProduct = PRODUCTS[heroIndex];
  const [selectedColor, setSelectedColor] = useState(heroProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState('G');

  // Sync color when hero product changes
  const handleSelectHeroProduct = (idx) => {
    setHeroIndex(idx);
    setSelectedColor(PRODUCTS[idx].colors[0]);
  };

  // Cart & Wishlist States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Modals & Drawers
  const [selectedProductView, setSelectedProductView] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Size Calculator Sliders
  const [userHeight, setUserHeight] = useState(176);
  const [userWeight, setUserWeight] = useState(74);

  // Customer Data
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    city: 'São Paulo',
    state: 'SP'
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removido dos favoritos');
        return prev.filter(item => item !== id);
      } else {
        addToast('Adicionado aos favoritos ❤️');
        return [...prev, id];
      }
    });
  };

  // Add item to Cart
  const handleAddToCart = (product, colorObj = null, sizeStr = null) => {
    const itemColor = colorObj || selectedColor || product.colors[0];
    const itemSize = sizeStr || selectedSize || 'G';
    const cartItemId = `${product.id}-${itemColor.id}-${itemSize}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [
          ...prev,
          {
            ...product,
            cartItemId,
            selectedColor: itemColor,
            selectedSize: itemSize,
            quantity: 1
          }
        ];
      }
    });

    addToast(`"${product.name}" (${itemColor.name} - ${itemSize}) adicionada ao carrinho!`);
    setIsCartOpen(true);
  };

  // Quantity Updates
  const updateQty = (cartItemId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const n = item.quantity + delta;
            return n > 0 ? { ...item, quantity: n } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Totals
  const subtotal = useMemo(() => cart.reduce((s, item) => s + item.price * item.quantity, 0), [cart]);
  const discountVal = useMemo(() => (subtotal * discountPercent) / 100, [subtotal, discountPercent]);
  const isFreeShipping = subtotal >= STORE_CONFIG.freeShippingMin;
  const shippingVal = cart.length > 0 && !isFreeShipping ? 14.90 : 0;
  const grandTotal = useMemo(() => Math.max(0, subtotal - discountVal + shippingVal), [subtotal, discountVal, shippingVal]);

  // Apply Coupon
  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === STORE_CONFIG.welcomeDiscountCode) {
      setDiscountPercent(10);
      addToast('Cupom AZUL10 aplicado! 10% OFF no seu pedido.');
    } else {
      addToast('Cupom inválido. Tente: AZUL10');
    }
  };

  // Recommended Size Calculator Logic
  const recommendedSize = useMemo(() => {
    if (userWeight < 62) return 'P';
    if (userWeight < 75) return 'M';
    if (userWeight < 88) return 'G';
    if (userWeight < 100) return 'GG';
    return 'XGG';
  }, [userWeight]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'todas' || p.category === selectedCategory;
      const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Search Popover State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // FAQ Items
  const FAQS = [
    {
      q: 'Qual é o tecido e a gramatura das camisetas?',
      a: 'Nossas camisetas Oversized são confeccionadas em Malha Heavyweight de 260g/m² (100% Algodão Penteado), enquanto a linha básica usa Algodão Pima 30.1 peruano. Ambas possuem toque ultra suave e estrutura rígida que não marca o corpo.'
    },
    {
      q: 'A gola esgarça após as lavagens?',
      a: 'Jamais! Todas as peças contam com gola canelada em Ribana pesada de 3.0cm e pesponto duplo reforçado de ombro a ombro, garantindo que o formato circular original permaneça impecável.'
    },
    {
      q: 'Como funciona a 1ª troca grátis?',
      a: 'Você tem até 30 dias após o recebimento para solicitar a troca de cor ou tamanho. A primeira troca tem o frete de devolução e reenvio 100% por nossa conta.'
    },
    {
      q: 'Como faço para comprar direto pelo WhatsApp?',
      a: 'Basta selecionar seus itens e clicar no botão "Comprar pelo WhatsApp". O sistema gera a lista formatada com os modelos, tamanhos, cores e endereço direto para nossa equipe de atendimento finalizar o envio.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 font-body relative overflow-x-hidden">
      
      {/* =================================================================== */}
      {/* 1. DYNAMIC FLOATING GLASS PILL NAVBAR (Switches to Bottom on Scroll) */}
      {/* =================================================================== */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-auto max-w-fit px-3.5 sm:px-5 py-1.5 rounded-full transition-all duration-700 ease-in-out glass-pill ${
          scrollPassedHero
            ? 'bottom-5 shadow-2xl border-white/30 scale-100'
            : 'top-4 shadow-xl scale-100'
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Nav Links (Proportional & Compact Menu without Logo/Text Emblem) */}
          <nav className="flex items-center gap-2 sm:gap-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-100">
            <a href="#hero" className="hover:text-amber-300 transition px-1 py-0.5">Início</a>
            <a href="#anatomia" className="hover:text-amber-300 transition hidden sm:inline px-1 py-0.5">A Camisa</a>
            <a href="#catalogo" className="hover:text-amber-300 transition px-1 py-0.5">Catálogo</a>
            <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-amber-300 transition hidden md:inline px-1 py-0.5">Tamanhos</button>
          </nav>

          <div className="h-3.5 w-px bg-white/20 hidden sm:block" />

          {/* Action Icons & Direct WhatsApp */}
          <div className="flex items-center gap-1">
            
            {/* Single Search Icon Button */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(prev => !prev)}
                className="p-1.5 rounded-full hover:bg-white/15 text-white transition flex items-center justify-center"
                title="Buscar"
              >
                <Search size={15} />
              </button>

              {/* Expandable Search Input Popover */}
              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-10 w-56 glass-pill p-2 rounded-2xl shadow-2xl z-50 border border-white/20"
                >
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 text-slate-300" size={13} />
                    <input
                      type="text"
                      placeholder="Buscar camisetas..."
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value);
                        const el = document.getElementById('catalogo');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      autoFocus
                      className="w-full bg-white/15 text-white placeholder-slate-300 text-xs py-1.5 pl-8 pr-7 rounded-xl outline-none focus:bg-white/25 transition"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-2 text-slate-300 hover:text-white">
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button 
              onClick={() => addToast(`Você possui ${wishlist.length} camisas nos favoritos`)}
              className="p-1.5 rounded-full hover:bg-white/15 text-white relative transition"
              title="Favoritos"
            >
              <Heart size={15} className={wishlist.length > 0 ? "fill-red-400 text-red-400" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Pill Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 rounded-full bg-white text-[#0A192F] hover:bg-slate-200 relative transition shadow-md"
              title="Carrinho"
            >
              <ShoppingBag size={15} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Sales Pill */}
            <a
              href={generateWhatsAppLink(
                [{ name: heroProduct.name, selectedColor: selectedColor, selectedSize: selectedSize, quantity: 1, price: heroProduct.price }],
                heroProduct.price,
                customerData,
                'WhatsApp Direct'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full transition shadow-md ml-1"
              title="Comprar pelo WhatsApp"
            >
              <MessageCircle size={13} />
              <span>WhatsApp</span>
            </a>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* =================================================================== */}
        {/* 2. FULL-BLEED 100VH HERO STAGE (WITH TEXT REFLECTION & ANIMATION) */}
        {/* =================================================================== */}
        <section id="hero" className="hero-fullbleed-stage">
          
          {/* Ambient Glowing Background Orbs */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none z-[1] orb-float-1" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none z-[1] orb-float-2" />

          {/* Background Full-Bleed Generative Fill Image Slider */}
          <AnimatePresence mode="wait">
            <motion.img
              key={heroProduct.id}
              src={heroProduct.heroModelImage || heroProduct.image}
              alt={heroProduct.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
          </AnimatePresence>

          {/* Smooth Dark Navy Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/85 to-transparent z-[2]" />

          {/* Floating Central Slide Navigation Arrows */}
          <div className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 z-20 flex justify-between items-center pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelectHeroProduct((heroIndex - 1 + PRODUCTS.length) % PRODUCTS.length)}
              className="pointer-events-auto p-3.5 rounded-full glass-pill text-white hover:bg-white/25 transition shadow-2xl border border-white/20 group"
              title="Campanha Anterior"
            >
              <ArrowLeft size={22} className="group-hover:-translate-x-0.5 transition" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelectHeroProduct((heroIndex + 1) % PRODUCTS.length)}
              className="pointer-events-auto p-3.5 rounded-full glass-pill text-white hover:bg-white/25 transition shadow-2xl border border-white/20 group"
              title="Próxima Campanha"
            >
              <ArrowRight size={22} className="group-hover:translate-x-0.5 transition" />
            </motion.button>
          </div>

          {/* Hero Content (Seamless Overlay direct on Background - Text Reflection Animated) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 pt-28 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Expanded Typography with Metallic Reflection Animation */}
              <div className="lg:col-span-9">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white max-w-3xl"
                >
                  
                  {/* Badge Loja */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-widest text-amber-300 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md mb-6 shadow-lg"
                  >
                    <Award size={15} />
                    <span>CONFECÇÃO PRÓPRIA • VILHENA - RO</span>
                  </motion.div>

                  {/* Main Store Title with Sliding Light Reflection ("animacoes com um reflexo o texto principal") */}
                  <h1 className="hero-title-headline text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] mb-5 drop-shadow-2xl text-white">
                    <span className="inline-block text-white">ALBARRAP</span> <br />
                    <span className="font-rounded-modern font-bold block text-2xl sm:text-4xl lg:text-5xl mt-2 tracking-wider uppercase text-white">
                      Camisetas Personalizadas
                    </span>
                  </h1>

                  {/* Subtitle / Chamada de Qualidade da Loja */}
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-medium drop-shadow-lg">
                    Confecção própria com tecidos selecionados de malha Heavyweight 260g e Algodão Pima. Caimento impecável, gola reforçada anti-esgarçamento e estampas exclusivas para vendas no atacado e varejo.
                  </p>

                  {/* 2 Main Action Buttons with Shine Sweep Animation */}
                  <div className="flex items-center gap-4 flex-wrap mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAddToCart(heroProduct, selectedColor, selectedSize)}
                      className="btn-shine-sweep px-8 py-4 bg-white text-[#0A192F] font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-100 transition duration-300 shadow-2xl flex items-center gap-2.5"
                    >
                      <ShoppingBag size={18} />
                      <span>Comprar Agora</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      href={generateWhatsAppLink(
                        [{ name: heroProduct.name, selectedColor: selectedColor, selectedSize: selectedSize, quantity: 1, price: heroProduct.price }],
                        heroProduct.price,
                        customerData,
                        'WhatsApp Direct'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shine-sweep px-8 py-4 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-emerald-400 transition duration-300 shadow-2xl flex items-center gap-2.5"
                    >
                      <MessageCircle size={18} />
                      <span>Peça pelo WhatsApp</span>
                    </motion.a>
                  </div>

                  {/* Slide Indicator */}
                  <div className="flex items-center gap-4 text-xs text-slate-200 font-bold">
                    <span>Coleção {heroIndex + 1} de {PRODUCTS.length}: <strong className="text-amber-300">{heroProduct.name}</strong></span>
                    <div className="flex gap-2">
                      {PRODUCTS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectHeroProduct(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${heroIndex === i ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white'}`}
                        />
                      ))}
                    </div>
                  </div>

                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. PROVADOR & PERSONALIZADOR DE PEÇA (DOBRA DE BAIXO DO HERO) */}
        {/* =================================================================== */}
        <motion.section 
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 px-4 bg-[#FDFBF7] border-b border-slate-200"
        >
          <div className="max-w-6xl mx-auto glass-card p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Product Info & Color Swatches */}
              <div className="flex-grow max-w-xl">
                <span className="inline-block bg-[#0A192F] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  Provador & Personalizador
                </span>
                <h3 className="font-serif-classic text-2xl sm:text-3xl font-bold text-[#0A192F] mb-1">
                  {heroProduct.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{heroProduct.material}</p>

                {/* Color Swatch Picker */}
                <div className="mb-4">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Escolha a Cor da Peça:
                  </div>
                  <div className="flex items-center gap-3">
                    {heroProduct.colors.map(col => (
                      <motion.button
                        key={col.id}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setSelectedColor(col)}
                        className={`w-9 h-9 rounded-full p-0.5 border-2 transition duration-300 ${
                          selectedColor.id === col.id ? 'border-[#0A192F] scale-110 shadow-md' : 'border-slate-300 hover:scale-105'
                        }`}
                        title={col.name}
                      >
                        <div className="w-full h-full rounded-full border border-black/20" style={{ backgroundColor: col.hex }} />
                      </motion.button>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 block mt-1.5">
                    Cor Selecionada: <strong className="text-[#0A192F]">{selectedColor.name}</strong>
                  </span>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Selecione o Tamanho:</span>
                    <button onClick={() => setIsSizeGuideOpen(true)} className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1">
                      <Ruler size={14} /> Guia de Tamanhos
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {heroProduct.sizes.map(sz => (
                      <motion.button
                        key={sz}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-11 h-11 rounded-xl text-xs font-extrabold border transition duration-300 ${
                          selectedSize === sz
                            ? 'bg-[#0A192F] text-white border-[#0A192F] font-black shadow-md'
                            : 'bg-white border-slate-300 text-slate-700 hover:border-[#0A192F]'
                        }`}
                      >
                        {sz}
                      </motion.button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Quick Calculator & Action CTA */}
              <div className="bg-[#0A192F] text-white p-6 rounded-2xl w-full lg:w-80 flex flex-col justify-between shadow-xl border border-white/10">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
                    <span>Simulador de Tamanho:</span>
                    <span className="bg-amber-400 text-black px-2 py-0.5 rounded text-[11px] font-extrabold">Ideal: {recommendedSize}</span>
                  </div>

                  <div className="space-y-3 text-xs mb-4">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Altura:</span>
                        <span className="font-bold">{userHeight} cm</span>
                      </div>
                      <input 
                        type="range" 
                        min="150" 
                        max="200" 
                        value={userHeight} 
                        onChange={e => setUserHeight(Number(e.target.value))} 
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Peso:</span>
                        <span className="font-bold">{userWeight} kg</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="120" 
                        value={userWeight} 
                        onChange={e => setUserWeight(Number(e.target.value))} 
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/15 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddToCart(heroProduct, selectedColor, selectedSize)}
                    className="btn-shine-sweep w-full py-3 bg-white text-[#0A192F] font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Adicionar ({selectedSize})</span>
                  </motion.button>
                </div>
              </div>

            </div>

          </div>
        </motion.section>

        {/* =================================================================== */}
        {/* 3. INSTAGRAM REELS SHOWCASE (3 VÍDEOS AUTOPLAY COM BOTÃO DE ÁUDIO) */}
        {/* =================================================================== */}
        <motion.section
          id="reels"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="py-16 px-4 bg-[#0A192F] text-white relative overflow-hidden border-t border-b border-white/10"
        >
          {/* Background Ambient Orbs */}
          <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none orb-float-1" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none orb-float-2" />

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 border border-amber-400/30 backdrop-blur-md">
                <svg size={16} className="w-4 h-4 text-amber-300 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>EXPERIÊNCIA REAL • REELS @CAMISETAS_ALBARRAP</span>
              </div>
              <h2 className="hero-title-headline text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                Bastidores & Caimento no Corpo
              </h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Confira a textura da malha, o caimento da gola ribana e o acabamento das peças em ação. Toque no botão de áudio de cada vídeo para ouvir o som!
              </p>
            </div>

            {/* 3 Reels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  id: 0,
                  src: '/videos/albarrap_reel_1.mp4',
                  tag: 'Oversized Boxy 260g',
                  title: 'Caimento Impecável no Corpo',
                  subtitle: 'Confecção Própria • Vilhena - RO',
                  product: PRODUCTS[0]
                },
                {
                  id: 1,
                  src: '/videos/albarrap_reel_2.mp4',
                  tag: 'Detalhe da Ribana 3.0cm',
                  title: 'Gola Encorpada & Zero Esgarçamento',
                  subtitle: 'Algodão Penteado Premium',
                  product: PRODUCTS[1]
                },
                {
                  id: 2,
                  src: '/videos/albarrap_reel_3.mp4',
                  tag: 'Coleção Exclusiva HD',
                  title: 'Estampa Conceitual em Silk',
                  subtitle: 'Disponível no Atacado e Varejo',
                  product: PRODUCTS[2]
                }
              ].map(reel => (
                <motion.div
                  key={reel.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[9/16] rounded-3xl overflow-hidden glass-pill shadow-2xl border border-white/20 bg-slate-950 group flex flex-col justify-between"
                >
                  {/* Video Player */}
                  <video
                    ref={videoRefs[reel.id]}
                    src={reel.src}
                    autoPlay
                    muted={reelsMuted[reel.id]}
                    loop
                    playsInline
                    preload="auto"
                    onClick={() => toggleReelPlay(reel.id)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer z-0"
                  />

                  {/* Top Overlay Header */}
                  <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/30 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-500 p-0.5 shadow-md">
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-black text-amber-300">
                          A
                        </div>
                      </div>
                      <div>
                        <span className="text-white text-xs font-bold block leading-tight">@camisetas_albarrap</span>
                        <span className="text-amber-300 text-[9px] font-extrabold uppercase tracking-widest block">{reel.tag}</span>
                      </div>
                    </div>

                    {/* Sound Toggle Button (Tap to enable/disable sound) */}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReelMute(reel.id);
                      }}
                      className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/25 hover:bg-black transition flex items-center justify-center shadow-2xl"
                      title={reelsMuted[reel.id] ? "Ativar Áudio" : "Desativar Áudio"}
                    >
                      {reelsMuted[reel.id] ? (
                        <VolumeX size={18} className="text-amber-300" />
                      ) : (
                        <Volume2 size={18} className="text-emerald-400 animate-pulse" />
                      )}
                    </motion.button>
                  </div>

                  {/* Play/Pause Central Play Indicator Overlay */}
                  {!reelsPlaying[reel.id] && (
                    <div 
                      onClick={() => toggleReelPlay(reel.id)}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer"
                    >
                      <div className="p-4 rounded-full bg-white/20 border border-white/30 text-white backdrop-blur-md">
                        <Play size={32} className="ml-1 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Right Side Column Actions (Like & Share) */}
                  <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 1.3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReelLike(reel.id);
                      }}
                      className={`p-3 rounded-full backdrop-blur-md transition border border-white/20 shadow-xl ${
                        reelsLiked[reel.id] ? 'bg-red-500 text-white' : 'bg-black/60 text-white hover:bg-black'
                      }`}
                    >
                      <Heart size={20} className={reelsLiked[reel.id] ? 'fill-white' : ''} />
                    </motion.button>
                    <span className="text-[10px] font-black text-white drop-shadow-md">
                      {reelsLikes[reel.id]}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToast('Link do Reel copiado para compartilhar!');
                      }}
                      className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black transition shadow-xl"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>

                  {/* Bottom Info & Direct CTA */}
                  <div className="relative z-10 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="font-serif-classic font-bold text-lg text-white leading-snug mb-1 drop-shadow-md">
                      {reel.title}
                    </h3>
                    <p className="text-slate-300 text-xs mb-3 line-clamp-1">
                      {reel.subtitle}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(reel.product);
                        }}
                        className="btn-shine-sweep flex-1 py-2.5 bg-white text-[#0A192F] font-black text-[11px] uppercase tracking-wider rounded-xl hover:bg-slate-200 transition shadow-lg flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={14} />
                        <span>Comprar Peça</span>
                      </button>

                      <a
                        href={generateWhatsAppLink([{ name: reel.product.name, price: reel.product.price, quantity: 1 }], reel.product.price, customerData, 'Reels Direct')}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl transition shadow-lg flex items-center justify-center"
                        title="Comprar pelo WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* =================================================================== */}
        {/* 3. PROMOTIONAL GLASS STRIP */}
        {/* =================================================================== */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="py-8 px-4 bg-[#FDFBF7]"
        >
          <div className="max-w-6xl mx-auto glass-pill rounded-3xl p-6 text-white grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl border border-white/20">
            
            <motion.div whileHover={{ y: -3 }} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <Tag size={22} />
              </div>
              <div>
                <h4 className="font-serif-classic font-bold text-sm text-white">Promoção de Lançamento</h4>
                <p className="text-xs text-slate-300">Leve 2 Camisetas e ganhe <strong>15% OFF</strong> no pedido</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">
                <QrCode size={22} />
              </div>
              <div>
                <h4 className="font-serif-classic font-bold text-sm text-white">Desconto Instantâneo PIX</h4>
                <p className="text-xs text-slate-300">5% OFF adicional automático no PIX</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-400/20 text-blue-300 flex items-center justify-center font-bold">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="font-serif-classic font-bold text-sm text-white">Frete Grátis Brasil</h4>
                <p className="text-xs text-slate-300">Em compras a partir de R$ 199,00</p>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* =================================================================== */}
        {/* 4. ANATOMY OF THE SHIRT (SEÇÃO ILUSTRATIVA COM GLASS CARDS) */}
        {/* =================================================================== */}
        <motion.section 
          id="anatomia" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-[#FDFBF7]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-[#0A192F] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-widest mb-3 shadow-md">
                Engenharia Têxtil Premium
              </span>
              <h2 className="font-serif-classic text-3xl sm:text-5xl font-bold text-[#0A192F]">
                A Anatomia da Camiseta Perfeita
              </h2>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Desenvolvida com especificações rigorosas para caimento atemporal e alta resistência.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between transition duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center mb-4 shadow-md">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-serif-classic font-bold text-lg text-[#0A192F] mb-2">
                    Malha Heavyweight 260g
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Algodão puro penteado com alta densidade (260g/m²). Tecido estruturado que não fica transparente nem marca o corpo.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-blue-800">100% Algodão Penteado</div>
              </motion.div>

              <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between transition duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center mb-4 shadow-md">
                    <Layers size={24} />
                  </div>
                  <h3 className="font-serif-classic font-bold text-lg text-[#0A192F] mb-2">
                    Gola Ribana 3.0cm
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ribana pesada com pesponto reforçado de ombro a ombro. Mantém o formato circular perfeito mesmo após dezenas de lavagens.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-blue-800">Zero Esgarçamento</div>
              </motion.div>

              <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between transition duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center mb-4 shadow-md">
                    <RefreshCw size={24} />
                  </div>
                  <h3 className="font-serif-classic font-bold text-lg text-[#0A192F] mb-2">
                    Pré-Encolhimento Industrial
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Peça pré-lavada e pré-encolhida em processo térmico industrial. A camiseta não encolhe após lavar em casa.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-blue-800">Tamanho Estável</div>
              </motion.div>

              <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between transition duration-300">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center mb-4 shadow-md">
                    <Compass size={24} />
                  </div>
                  <h3 className="font-serif-classic font-bold text-lg text-[#0A192F] mb-2">
                    Modelagem Oversized Boxy
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Corte com ombros ligeiramente caídos e caída reta. Proporciona visual elegante, sóbrio e confortável.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-blue-800">Modelagem Própria</div>
              </motion.div>

            </div>

          </div>
        </motion.section>

        {/* =================================================================== */}
        {/* 5. CATALOG GRID WITH GLASS FILTER TABS */}
        {/* =================================================================== */}
        <motion.section 
          id="catalogo" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-white border-t border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block bg-[#0A192F] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-widest mb-3">
                Coleção Completa
              </span>
              <h2 className="font-serif-classic text-3xl sm:text-5xl font-bold text-[#0A192F]">
                Catálogo de Camisetas
              </h2>
            </div>

            {/* Filter Tabs & Sorting */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest transition duration-300 ${
                      selectedCategory === cat.id ? 'bg-[#0A192F] text-white shadow-md scale-105' : 'bg-[#EFECE6] text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-slate-500" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-[#EFECE6] border border-slate-300 text-slate-800 text-xs font-bold py-2 px-3.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="popular">Mais Vendidas</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliadas</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <motion.div 
                  key={product.id} 
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card overflow-hidden hover:border-[#0A192F] transition duration-300 flex flex-col justify-between group"
                >
                  
                  <div>
                    <div 
                      className="relative aspect-square bg-slate-100 cursor-pointer overflow-hidden"
                      onClick={() => setSelectedProductView(product)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-108 transition duration-700 ease-out"
                      />

                      <span className="absolute top-3 left-3 bg-[#0A192F] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:bg-[#0A192F] hover:text-white transition ${
                          wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : ''
                        }`}
                      >
                        <Heart size={16} />
                      </button>
                    </div>

                    <div className="p-5">
                      <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest block mb-1">
                        {product.categoryName}
                      </span>

                      <h3 
                        onClick={() => setSelectedProductView(product)}
                        className="font-serif-classic font-bold text-[#0A192F] text-base leading-snug hover:text-blue-700 cursor-pointer transition line-clamp-1 mb-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-slate-500 text-xs line-clamp-1 mb-3">
                        {product.subtitle}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-3">
                        <Star size={14} className="fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 text-[11px]">({product.reviewsCount} avaliações)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 line-through">
                        R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                      </div>
                      <div className="font-serif-classic font-bold text-lg text-[#0A192F]">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(product)}
                      className="p-2.5 rounded-full bg-[#0A192F] text-white hover:bg-blue-700 transition shadow-md"
                      title="Adicionar ao carrinho"
                    >
                      <ShoppingBag size={18} />
                    </motion.button>
                  </div>

                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* =================================================================== */}
        {/* 6. REVIEWS & REPUTATION */}
        {/* =================================================================== */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-[#FDFBF7]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-widest mb-2">
                Avaliação dos Clientes
              </span>
              <h2 className="font-serif-classic text-3xl sm:text-4xl font-bold text-[#0A192F]">
                Quem Comprou, Aprova
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map(rev => (
                <div key={rev.id} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt={rev.name} className="w-11 h-11 rounded-full object-cover border" />
                        <div>
                          <h4 className="font-bold text-[#0A192F] text-sm">{rev.name}</h4>
                          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Compra Verificada
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400 mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} className="fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-bold text-slate-500">
                    {rev.sizeBought}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* =================================================================== */}
        {/* 7. FAQ SECTION */}
        {/* =================================================================== */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-white border-t border-slate-200"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            
            <div className="text-center mb-10">
              <span className="inline-block bg-[#0A192F] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-widest mb-2">
                Dúvidas Frequentes
              </span>
              <h2 className="font-serif-classic text-3xl font-bold text-[#0A192F]">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                  className="glass-card p-5 cursor-pointer hover:border-[#0A192F] transition"
                >
                  <div className="flex justify-between items-center font-bold text-sm text-[#0A192F]">
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-[#0A192F]" />
                      {faq.q}
                    </span>
                    <ChevronDown size={18} className={`transition-transform ${activeFaqIndex === idx ? 'rotate-180 text-[#0A192F]' : 'text-slate-400'}`} />
                  </div>

                  {activeFaqIndex === idx && (
                    <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-white py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs text-slate-300">
          <div>
            <div className="font-serif-classic font-bold text-2xl text-white mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-[#0A192F] text-sm flex items-center justify-center font-black">A</span>
              <span>{STORE_CONFIG.name}</span>
            </div>
            <p className="text-slate-300 mb-2">{STORE_CONFIG.tagline} • Atacado & Varejo</p>
            <p className="text-slate-400 text-[11px]">📍 {STORE_CONFIG.address}, BNH, {STORE_CONFIG.cityState} - CEP {STORE_CONFIG.cep}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              href={STORE_CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition border border-white/15"
            >
              <span>Instagram: {STORE_CONFIG.instagramHandle}</span>
              <ArrowUpRight size={14} />
            </a>

            <div className="flex gap-4 font-bold text-slate-300">
              <a href="#catalogo" className="hover:text-amber-300 transition">Catálogo</a>
              <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-amber-300 transition">Tamanhos</button>
              <a href={generateWhatsAppLink([], 0, customerData, 'Contato')} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition text-emerald-400">WhatsApp Direct</a>
            </div>
          </div>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* MODALS & DRAWERS */}
      {/* =================================================================== */}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="p-5 bg-[#0A192F] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 font-serif-classic font-bold text-base">
                  <ShoppingBag size={20} />
                  <span>Seu Carrinho ({cart.length})</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              <div className="p-5 flex-grow overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <ShoppingBag size={48} className="mx-auto mb-2 opacity-30 text-slate-600" />
                    <p className="font-bold text-slate-700">Seu carrinho está vazio</p>
                    <p className="text-xs text-slate-400 mt-1">Navegue pelas camisetas e escolha as suas favoritas.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartItemId} className="flex gap-3 pb-3 border-b border-slate-100">
                      <img src={item.selectedColor?.image || item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-slate-100" />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-900">{item.name}</h4>
                          <div className="text-[11px] text-slate-500">
                            Cor: {item.selectedColor.name} | Tam: {item.selectedSize}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full text-xs font-bold">
                            <button onClick={() => updateQty(item.cartItemId, -1)} className="hover:text-blue-600">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQty(item.cartItemId, 1)} className="hover:text-blue-600">+</button>
                          </div>
                          <span className="font-extrabold text-xs text-slate-900">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 bg-[#FDFBF7] border-t border-slate-200 space-y-3 text-xs">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupom (ex: AZUL10)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="w-full bg-white border border-slate-300 p-2 rounded-lg outline-none uppercase font-bold text-xs"
                    />
                    <button onClick={applyCoupon} className="bg-[#0A192F] text-white px-3 font-bold rounded-lg hover:bg-blue-600 transition">
                      Aplicar
                    </button>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Desconto ({discountPercent}%)</span>
                      <span>- R$ {discountVal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Frete</span>
                    <span className="font-bold text-blue-600">{isFreeShipping ? 'GRÁTIS' : 'R$ 14,90'}</span>
                  </div>

                  <div className="flex justify-between font-serif-classic font-bold text-base text-slate-900 pt-2 border-t">
                    <span>Total</span>
                    <span>R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={generateWhatsAppLink(cart, grandTotal, customerData, 'WhatsApp Direct')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-full hover:bg-emerald-500 transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle size={16} />
                      <span>Comprar Direto no WhatsApp</span>
                    </a>
                  </div>

                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsSizeGuideOpen(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>

            <h3 className="font-serif-classic font-bold text-xl text-[#0A192F] mb-2 flex items-center gap-2">
              <Ruler className="text-blue-700" size={20} /> Guia & Provador de Tamanhos
            </h3>
            
            <div className="bg-[#FDFBF7] border border-slate-200 rounded-xl p-4 mb-4">
              <div className="text-xs font-extrabold uppercase text-blue-700 mb-2">Simulador de Tamanho Ideal:</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Altura: {userHeight} cm</label>
                  <input type="range" min="150" max="200" value={userHeight} onChange={e => setUserHeight(Number(e.target.value))} className="w-full accent-[#0A192F] cursor-pointer" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Peso: {userWeight} kg</label>
                  <input type="range" min="50" max="120" value={userWeight} onChange={e => setUserWeight(Number(e.target.value))} className="w-full accent-[#0A192F] cursor-pointer" />
                </div>
              </div>
              <div className="mt-3 text-xs font-bold text-slate-700 flex justify-between items-center pt-2 border-t">
                <span>Recomendação:</span>
                <span className="bg-[#0A192F] text-white px-3 py-1 rounded-lg text-sm font-black">Tamanho {recommendedSize}</span>
              </div>
            </div>

            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-[#0A192F] text-white">
                  <th className="p-2 rounded-tl-lg">Tam</th>
                  <th className="p-2">Comprimento</th>
                  <th className="p-2">Tórax / Peito</th>
                  <th className="p-2 rounded-tr-lg">Ombro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className={recommendedSize === 'P' ? 'bg-blue-50 font-bold' : ''}><td className="p-2">P</td><td>72 cm</td><td>54 cm</td><td>50 cm</td></tr>
                <tr className={recommendedSize === 'M' ? 'bg-blue-50 font-bold' : ''}><td className="p-2">M</td><td>75 cm</td><td>57 cm</td><td>53 cm</td></tr>
                <tr className={recommendedSize === 'G' ? 'bg-blue-50 font-bold' : ''}><td className="p-2">G</td><td>78 cm</td><td>60 cm</td><td>56 cm</td></tr>
                <tr className={recommendedSize === 'GG' ? 'bg-blue-50 font-bold' : ''}><td className="p-2">GG</td><td>81 cm</td><td>63 cm</td><td>59 cm</td></tr>
                <tr className={recommendedSize === 'XGG' ? 'bg-blue-50 font-bold' : ''}><td className="p-2">XGG</td><td>84 cm</td><td>66 cm</td><td>62 cm</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick View Product Modal */}
      {selectedProductView && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProductView(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProductView(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img src={selectedProductView.image} alt={selectedProductView.name} className="w-full h-80 object-cover rounded-xl bg-slate-100" />
              
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-blue-700">{selectedProductView.categoryName}</span>
                  <h3 className="text-xl font-bold text-[#0A192F] font-serif-classic mt-1">{selectedProductView.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedProductView.subtitle}</p>

                  <div className="text-2xl font-bold text-[#0A192F] mt-3 font-serif-classic">
                    R$ {selectedProductView.price.toFixed(2).replace('.', ',')}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {selectedProductView.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProductView);
                    setSelectedProductView(null);
                  }}
                  className="w-full py-3.5 bg-[#0A192F] text-white font-extrabold text-xs uppercase tracking-widest rounded-full hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-6"
                >
                  <ShoppingBag size={18} />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="fixed bottom-24 right-5 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className="glass-pill text-white px-4 py-3 rounded-xl text-xs font-bold shadow-xl border-l-4 border-amber-400 flex items-center gap-2">
            <Check size={16} className="text-amber-400" />
            <span>{t.msg}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
