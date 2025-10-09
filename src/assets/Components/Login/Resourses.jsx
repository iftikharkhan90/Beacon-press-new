import React, { useState } from 'react';
import { ExternalLink, BookOpen, Award, Users, Mail, Globe, Twitter, Linkedin } from 'lucide-react';

const BeaconPressResources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const teamMembers = [
    {
      id: 1,
      name: "Helene Atwan",
      role: "Executive Editor",
      category: "editorial",
      bio: "Leading voice in progressive publishing with over 15 years of experience in social justice literature.",
      work: [
        "Best American Essays series",
        "Environmental Justice publications",
        "Civil Rights memoirs"
      ],
      profileLink: "https://beacon.org/helene-atwan",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "@hatwan",
        linkedin: "helene-atwan"
      },
      email: "hatwan@beacon.org"
    },
    {
      id: 2,
      name: "Gayatri Patnaik",
      role: "Senior Editor",
      category: "editorial",
      bio: "Specializes in memoirs, social justice, and contemporary political writing.",
      work: [
        "Political memoirs",
        "Social activism books",
        "Cultural criticism"
      ],
      profileLink: "https://beacon.org/gayatri-patnaik",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "@gpatnaik",
        linkedin: "gayatri-patnaik"
      },
      email: "gpatnaik@beacon.org"
    },
    {
      id: 3,
      name: "Will Myers",
      role: "Editor",
      category: "editorial",
      bio: "Focuses on history, biography, and current affairs with emphasis on underrepresented voices.",
      work: [
        "Historical biographies",
        "Current affairs analysis",
        "Social movement histories"
      ],
      profileLink: "https://beacon.org/will-myers",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "@willmyers",
        linkedin: "will-myers-editor"
      },
      email: "wmyers@beacon.org"
    },
    {
      id: 4,
      name: "Susan Lumenello",
      role: "Associate Editor",
      category: "editorial",
      bio: "Emerging voices advocate with focus on diverse perspectives and innovative storytelling.",
      work: [
        "Debut author development",
        "Diverse voices initiative",
        "Contemporary fiction"
      ],
      profileLink: "https://beacon.org/susan-lumenello",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "@slumenello",
        linkedin: "susan-lumenello"
      },
      email: "slumenello@beacon.org"
    },
    {
      id: 5,
      name: "Tom Hallock",
      role: "Marketing Director",
      category: "marketing",
      bio: "Strategic marketing leader driving awareness for progressive literature and social justice content.",
      work: [
        "Campaign strategy",
        "Digital marketing",
        "Author platform building"
      ],
      profileLink: "https://beacon.org/tom-hallock",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "@tomhallock",
        linkedin: "tom-hallock-marketing"
      },
      email: "thallock@beacon.org"
    },
    {
      id: 6,
      name: "Marcy Barnes",
      role: "Publicist",
      category: "marketing",
      bio: "Media relations expert specializing in social impact books and progressive authors.",
      work: [
        "Media relations",
        "Author tours",
        "Press campaigns"
      ],
      profileLink: "https://beacon.org/marcy-barnes",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "@marcybarnes",
        linkedin: "marcy-barnes-pr"
      },
      email: "mbarnes@beacon.org"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Team Members', icon: Users },
    { id: 'editorial', label: 'Editorial Team', icon: BookOpen },
    { id: 'marketing', label: 'Marketing Team', icon: Award }
  ];

  const filteredMembers = selectedCategory === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Beacon Press Team Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate team behind progressive publishing, dedicated to amplifying voices 
              that challenge, inspire, and transform our understanding of the world.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                <Icon size={20} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:scale-105"
            >
              {/* Profile Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-100">{member.role}</p>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>

                {/* Work Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-600" />
                    Key Work Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.work.map((work, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-3 mt-3">
                    {member.social.twitter && (
                      <a
                        href={`https://twitter.com/${member.social.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${member.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Profile Link */}
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={member.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:underline"
                  >
                    <Globe size={16} />
                    View Full Profile
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect with Beacon Press
          </h2>
          <p className="text-gray-600 mb-6">
            Ready to collaborate or learn more about our mission? Reach out to our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://beacon.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Globe size={20} />
              Visit Beacon Press
            </a>
            <a
              href="mailto:info@beacon.org"
              className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <Mail size={20} />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeaconPressResources;