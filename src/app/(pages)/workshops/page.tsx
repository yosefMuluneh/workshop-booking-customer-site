import { getPublicWorkshops } from '../../api/customerApi';
import WorkshopCard from '../../components/WorkshopCard';
import { Workshop } from '@/types';
import { AcademicCapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

// The return type of the function is now explicitly Promise<Workshop[]>
async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const workshops = await getPublicWorkshops();
    return workshops;
  } catch (error) {
    console.error("Failed to fetch workshops:", error);
    return [];
  }
}

const WorkshopsPage = async () => {
  const workshops = await fetchWorkshops();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl mx-4 mb-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <AcademicCapIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Discover Amazing
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Workshops
            </span>
          </h1>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Join expert-led sessions designed to boost your skills and accelerate your career growth
          </p>
          
          {/* Search Bar Placeholder */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
            </div>
            <input
              type="text"
              placeholder="Search workshops..."
              className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
            />
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Workshops Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {workshops && workshops.length > 0 ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Featured Workshops
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Choose from our carefully curated selection of workshops designed by industry experts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AcademicCapIcon className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              No Workshops Available
            </h3>
            <p className="text-slate-600 max-w-md mx-auto mb-8">
              We're working hard to bring you amazing workshops. Check back soon for new additions!
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-sm font-medium">
              Notify Me When Available
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopsPage;