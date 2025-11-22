import { Link } from 'react-router-dom';
import { Stethoscope, Users, FileText, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useConsultations } from '../context/ConsultationContext';

export default function Dashboard() {
    const { user } = useAuth();
    const { consultations } = useConsultations();

    const quickActions = [
        {
            title: 'New Consultation',
            description: 'Start Visit',
            icon: Stethoscope,
            color: 'bg-blue-500',
            link: '/consultation'
        },
        {
            title: 'Patient List',
            description: 'View All',
            icon: Users,
            color: 'bg-green-500',
            link: '/patients'
        },
        {
            title: 'Visit History',
            description: 'Records',
            icon: FileText,
            color: 'bg-purple-500',
            link: '/schedule'
        },
        {
            title: 'Billing',
            description: 'Payments',
            icon: CreditCard,
            color: 'bg-orange-500',
            link: '/dashboard'
        }
    ];

    const todayPatients = [
        { id: 1, name: 'Aarav Kumar', age: '5 years', complaint: 'Fever & cough', time: 'Arrived 9:10 AM', status: 'In Consultation' },
        { id: 2, name: 'Diya Sharma', age: '3 years', complaint: 'Vaccination', time: 'Arrived 9:45 AM', status: 'Waiting' },
        { id: 3, name: 'Rohan Patel', age: '7 years', complaint: 'Asthma follow-up', time: 'Arrived 10:00 AM', status: 'Waiting' }
    ];

    // Get the 5 most recent consultations
    const recentConsultations = consultations.slice(0, 5);

    // Calculate today's patient count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysConsultations = consultations.filter(c => {
        const consultationDate = new Date(c.date);
        consultationDate.setHours(0, 0, 0, 0);
        return consultationDate.getTime() === today.getTime();
    });

    const todayStats = [
        { label: "Today's Patients", value: todaysConsultations.length.toString(), icon: Users, color: 'text-blue-600' },
        { label: 'Waiting List', value: '12', icon: Clock, color: 'text-yellow-600' },
        { label: 'Completed Today', value: consultations.length.toString(), icon: CheckCircle, color: 'text-green-600' },
        { label: 'Pending Review', value: '3', icon: FileText, color: 'text-red-600' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Hello, {user?.name || 'Dr. Demo'}
                </h1>
                <p className="mt-1 text-sm text-gray-500">Welcome to VIDHI AI. Here is your clinic overview.</p>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.link}
                        className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${action.color}`}>
                                    <action.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{action.title}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{action.description}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {todayStats.map((stat) => (
                    <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                                        <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Clinic Operations */}
                <div className="lg:col-span-2 bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                            Today's Clinic Operations
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Real-time patient queue</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {todayPatients.map((patient, index) => (
                            <div key={patient.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${patient.status === 'In Consultation'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                                            <p className="text-sm text-gray-500">{patient.age} • {patient.complaint}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                <Clock className="h-3 w-3 inline mr-1" />
                                                {patient.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${patient.status === 'In Consultation'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {patient.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <Link to="/schedule" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View All →
                        </Link>
                    </div>
                </div>

                {/* Recent Consultations */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-purple-600" />
                            Recent Consultations
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Last 5 visits</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentConsultations.length === 0 ? (
                            <div className="px-6 py-8 text-center">
                                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                <p className="text-sm text-gray-500">No consultations saved yet</p>
                                <p className="text-xs text-gray-400 mt-1">Start a new consultation to see it here</p>
                            </div>
                        ) : (
                            recentConsultations.map((consultation) => (
                                <div key={consultation.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">{consultation.patientName}</p>
                                            <p className="text-xs text-gray-500 mt-1">{consultation.age} years • {consultation.complaint}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                <Clock className="h-3 w-3 inline mr-1" />
                                                {new Date(consultation.date).toLocaleString('en-IN', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                            {consultation.icdCodes.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {consultation.icdCodes.slice(0, 3).map((code) => (
                                                        <span
                                                            key={code.code}
                                                            className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                                                        >
                                                            {code.code}
                                                        </span>
                                                    ))}
                                                    {consultation.icdCodes.length > 3 && (
                                                        <span className="text-xs text-gray-500">
                                                            +{consultation.icdCodes.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <Link to="/patients" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View All →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
