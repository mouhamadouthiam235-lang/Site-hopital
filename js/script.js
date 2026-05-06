// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
});

// Changement de couleur de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Navigation fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll pour les cartes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de service et d'équipe
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.service-card, .team-card, .doctor-card, .mission-card, .why-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});

// Gestion du formulaire de rendez-vous
const rdvForm = document.getElementById('rdvForm');
if (rdvForm) {
    // Validation de la date (pas de dates passées)
    const dateInput = rdvForm.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    rdvForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        // Animation de soumission
        submitBtn.textContent = 'Confirmation en cours...';
        submitBtn.disabled = true;
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const nom = formData.get('nom');
        const telephone = formData.get('telephone');
        const service = formData.get('service');
        const date = formData.get('date');
        const heure = formData.get('heure');
        
        // Simuler l'envoi (remplacer par un vrai appel API en production)
        setTimeout(() => {
            alert(`✅ Rendez-vous confirmé !\n\nNom: ${nom}\nService: ${service}\nDate: ${date} à ${heure}\n\nVous recevrez un SMS de confirmation au ${telephone}`);
            rdvForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Optionnel: rediriger vers la page d'accueil
            // window.location.href = 'index.html';
        }, 1500);
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        // Animation de soumission
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const prenom = formData.get('prenom');
        const nom = formData.get('nom');
        const email = formData.get('email');
        const sujet = formData.get('sujet');
        
        // Simuler l'envoi (remplacer par un vrai appel API en production)
        setTimeout(() => {
            alert(`✅ Message envoyé avec succès !\n\nNous avons bien reçu votre message concernant "${sujet}".\n\nNous vous répondrons dans les plus brefs délais à l'adresse ${email}.\n\nMerci de nous avoir contactés !`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Animation des compteurs (stats)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer pour les statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number, .stat-number-large');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    statNumber.textContent = '0';
                    animateValue(statNumber, 0, number, 2000);
                    statNumber.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

// Observer les cartes de stats
document.querySelectorAll('.stat-card, .stat-card-large').forEach(card => {
    statsObserver.observe(card);
});

// Validation du formulaire en temps réel
function addFormValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#2c7a7b';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#ddd';
            }
        });
    });
}

// Appliquer la validation aux formulaires
addFormValidation('rdvForm');
addFormValidation('contactForm');

// Gestion du filtre de médecin par service (page RDV)
const serviceSelect = document.getElementById('service');
const medecinSelect = document.getElementById('medecin');

if (serviceSelect && medecinSelect) {
    serviceSelect.addEventListener('change', function() {
        const service = this.value;
        const allOptions = medecinSelect.querySelectorAll('option');
        
        // Réinitialiser
        medecinSelect.value = '';
        
        // Afficher tous les médecins par défaut
        allOptions.forEach(option => {
            option.style.display = 'block';
        });
        
        // Filtrer selon le service sélectionné
        if (service === 'cardiologie') {
            allOptions.forEach(option => {
                if (option.value && option.value !== 'kane') {
                    option.style.display = 'none';
                }
            });
        } else if (service === 'pediatrie') {
            allOptions.forEach(option => {
                if (option.value && option.value !== 'sow') {
                    option.style.display = 'none';
                }
            });
        } else if (service === 'gynecologie') {
            allOptions.forEach(option => {
                if (option.value && option.value !== 'sarr') {
                    option.style.display = 'none';
                }
            });
        } else if (service === 'dentiste') {
            allOptions.forEach(option => {
                if (option.value && option.value !== 'thiam') {
                    option.style.display = 'none';
                }
            });
        } else if (service === 'general') {
            allOptions.forEach(option => {
                if (option.value && !['diallo', 'ndiaye'].includes(option.value)) {
                    option.style.display = 'none';
                }
            });
        }
    });
}

// Message de bienvenue dans la console
console.log('%c🏥 Centre de Santé Al Baraka', 'color: #2c7a7b; font-size: 20px; font-weight: bold;');
console.log('%cSite web développé avec ❤️', 'color: #38b2ac; font-size: 14px;');
console.log('%cVotre santé est notre priorité!', 'color: #666; font-size: 12px;');

// Fonction pour afficher un message de confirmation avant de quitter la page avec un formulaire non soumis
let formModified = false;

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            formModified = true;
        });
    });
    
    form.addEventListener('submit', () => {
        formModified = false;
    });
});

window.addEventListener('beforeunload', (e) => {
    if (formModified) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Smooth scroll vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Créer un bouton "Retour en haut" si on scroll
let scrollTopBtn = null;

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: #2c7a7b;
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                z-index: 999;
                transition: all 0.3s;
            `;
            scrollTopBtn.addEventListener('click', scrollToTop);
            scrollTopBtn.addEventListener('mouseenter', function() {
                this.style.background = '#234e52';
                this.style.transform = 'scale(1.1)';
            });
            scrollTopBtn.addEventListener('mouseleave', function() {
                this.style.background = '#2c7a7b';
                this.style.transform = 'scale(1)';
            });
            document.body.appendChild(scrollTopBtn);
        }
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else if (scrollTopBtn) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

// Gestion des FAQ (si présentes)
const faqLinks = document.querySelectorAll('.faq-link');
faqLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Cette fonctionnalité sera bientôt disponible. Contactez-nous pour plus d\'informations.');
    });
});

console.log('✅ Site du Centre de Santé Al Baraka chargé avec succès!');
