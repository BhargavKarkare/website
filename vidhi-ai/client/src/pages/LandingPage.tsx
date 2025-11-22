
import { Link } from 'react-router-dom';
import { Stethoscope, Sparkles, Baby, ShieldCheck, Clock, FileText, BarChart3, Check, ArrowRight, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function LandingPage() {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered SOAP Notes',
            description: 'Generate comprehensive clinical notes from voice or text input in seconds. Our AI understands pediatric terminology and context.',
            color: 'from-teal-500 to-blue-500'
        },
        {
            icon: Baby,
            title: 'Pediatric Specific',
            description: 'Built exclusively for pediatricians with growth charts, vaccination tracking, and age-specific clinical guidelines.',
            color: 'from-blue-500 to-purple-500'
        },
        {
            icon: FileText,
            title: 'Accurate ICD-10 Coding',
            description: 'Real-time ICD-10 code suggestions from our verified pediatric database - not LLM guesses.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: ShieldCheck,
            title: 'Enterprise Security',
            description: 'HIPAA compliant encryption, role-based access control, and complete audit trails for peace of mind.',
            color: 'from-pink-500 to-teal-500'
        },
        {
            icon: Clock,
            title: 'Waiting List Management',
            description: 'Automated queue management with real-time updates. Know exactly who\'s next and manage your clinic flow.',
            color: 'from-teal-500 to-green-500'
        },
        {
            icon: BarChart3,
            title: 'Vitals & Growth Charts',
            description: 'Track vitals, calculate BMI automatically, and visualize growth percentiles with interactive charts.',
            color: 'from-green-500 to-blue-500'
        }
    ];

    const pricingPlans = [
        {
            name: 'Free',
            price: '₹0',
            period: 'forever',
            description: 'Perfect for trying out VIDHI AI',
            features: [
                '5 patients per day',
                'Limited SOAP generation',
                'Basic ICD-10 lookup',
                'Community support',
                'Single user'
            ],
            cta: 'Get Started',
            popular: false,
            color: 'border-gray-200'
        },
        {
            name: 'Basic',
            price: '₹1,499',
            period: 'per month',
            description: 'For individual practitioners',
            features: [
                '50 patients per day',
                'Unlimited SOAP notes',
                'Full ICD-10 database',
                'Vitals tracking',
                'Email support',
                'PDF export',
                'Single user'
            ],
            cta: 'Start Free Trial',
            popular: false,
            color: 'border-blue-200'
        },
        {
            name: 'Pro',
            price: '₹2,999',
            period: 'per month',
            description: 'For busy practices',
            features: [
                'Unlimited patients',
                'Unlimited SOAP notes',
                'Full ICD-10 database',
                'Advanced vitals & charts',
                'Priority support',
                'PDF export',
                'Up to 3 users',
                'Custom templates',
                'API access'
            ],
            cta: 'Start Free Trial',
            popular: true,
            color: 'border-teal-500'
        },
        {
            name: 'Clinic/Hospital',
            price: '₹5,999',
            period: 'per month',
            description: 'For multi-doctor clinics',
            features: [
                'Unlimited patients',
                'Unlimited SOAP notes',
                'Full ICD-10 database',
                'Advanced analytics',
                'Dedicated support',
                'PDF export',
                'Unlimited users',
                'Custom templates',
                'API access',
                'White-label option',
                'Custom integrations'
            ],
            cta: 'Contact Sales',
            popular: false,
            color: 'border-purple-200'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-primary p-2 rounded-lg">
                                <Stethoscope className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">VIDHI AI</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
                            <a href="#pricing" className="text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
                            <Link to="/login" className="text-gray-600 hover:text-teal-600 transition-colors">Sign In</Link>
                            <Link to="/login">
                                <Button size="sm" className="btn-glow">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Sparkles className="h-4 w-4" />
                                <span>AI-Powered Clinical Assistant</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                VIDHI AI — Your <span className="text-gradient">Pediatric</span> Clinical Assistant
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Generate instant SOAP notes, accurate ICD-10 codes, and manage your clinic seamlessly.
                                Spend less time on paperwork and more time with your little patients.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/login">
                                    <Button size="lg" className="btn-glow w-full sm:w-auto">
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/demo">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        <Play className="mr-2 h-5 w-5" />
                                        Try Demo
                                    </Button>
                                </Link>
                            </div>
                            <p className="mt-6 text-sm text-gray-500">
                                ✓ No credit card required &nbsp;&nbsp; ✓ 14-day free trial &nbsp;&nbsp; ✓ Cancel anytime
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="relative animate-fade-in">
                            <div className="absolute inset-0 gradient-mesh opacity-30 blur-3xl"></div>
                            <img
                                src="/images/hero-pediatrician.png"
                                alt="Pediatrician with child patient"
                                className="relative rounded-2xl shadow-2xl w-full hover-lift"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Everything You Need for <span className="text-gradient">Pediatric Care</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Built by doctors, for doctors. VIDHI AI understands the unique needs of pediatric practice.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card-hover p-6 animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Simple, <span className="text-gradient">Transparent</span> Pricing
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose the plan that fits your practice. All plans include core features.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative card p-6 ${plan.popular ? 'ring-2 ring-teal-500 shadow-xl scale-105' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="mb-2">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-500 ml-2">/ {plan.period}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{plan.description}</p>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start">
                                            <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/login" className="block">
                                    <Button
                                        className={`w-full ${plan.popular ? 'btn-glow' : ''}`}
                                        variant={plan.popular ? 'default' : 'outline'}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 pattern-grid-lg opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Transform Your Practice?
                    </h2>
                    <p className="text-xl text-teal-100 mb-8">
                        Join hundreds of pediatricians who trust VIDHI AI for their clinical documentation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/login">
                            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 w-full sm:w-auto">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/demo">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                                <Play className="mr-2 h-5 w-5" />
                                Watch Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="bg-gradient-primary p-2 rounded-lg">
                                    <Stethoscope className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-white">VIDHI AI</span>
                            </div>
                            <p className="text-sm">
                                Your trusted pediatric clinical assistant powered by AI.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-teal-400 transition-colors">Pricing</a></li>
                                <li><Link to="/demo" className="hover:text-teal-400 transition-colors">Demo</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                                <li><Link to="/login" className="hover:text-teal-400 transition-colors">Sign In</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2024 VIDHI AI Healthcare Solutions. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
