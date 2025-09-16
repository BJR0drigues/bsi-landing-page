/*
 * Script principal para BSI Landing Page
 * Curso de Bacharelado em Sistemas de Informação IESGO
 * Versão 1.0
 */

// Aguardar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Configuração das partículas de fundo
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#4361ee'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3bc9db',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Animação de digitação na hero section
    const texts = ['Transforme seu futuro com', 'Conquiste o mercado com', 'Inove sua carreira com'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        document.querySelector('.typing-text').textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    // Iniciar a animação de digitação após um pequeno delay
    setTimeout(type, 1500);

    // Colorir o código na animação
    const codeElement = document.querySelector('.code-animation code');
    if (codeElement) {
        const codeText = codeElement.innerHTML;
        const formattedCode = codeText
            .replace(/function|const|new|return/g, '<span class="keyword">$&</span>')
            .replace(/futuro|aprenderTecnologias|transformarMercado/g, '<span class="function">$&</span>')
            .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
            .replace(/\/\/ .*$/gm, '<span class="comment">$&</span>');
        
        codeElement.innerHTML = formattedCode;
    }

    // Toggle do menu móvel
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animar o hamburger para X
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }

    // Fechar o menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Mudar o estilo da navbar ao rolar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tabs para a grade curricular
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover classe active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active na tab clicada
            tab.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const semester = tab.dataset.semester;
            
            // Esconder todos os conteúdos
            document.querySelectorAll('.semester-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar o conteúdo da tab selecionada
            document.getElementById(`semester-${semester}`).classList.add('active');
        });
    });

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para o tamanho da navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação para o botão de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Adicionar classe 'active' ao link de navegação correspondente à seção visível
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Adicionar efeito de destaque ao código
    const codeLines = document.querySelectorAll('.code-animation code');
    if (codeLines.length > 0) {
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * codeLines.length);
            codeLines[randomIndex].classList.add('highlight-line');
            
            setTimeout(() => {
                codeLines[randomIndex].classList.remove('highlight-line');
            }, 1000);
        }, 2000);
    }
});
