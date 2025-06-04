
interface AdminTabsProps {
  activeTab: 'articles' | 'categories' | 'authors' | 'events';
  setActiveTab: (tab: 'articles' | 'categories' | 'authors' | 'events') => void;
  articles: any[] | undefined;
  categories: any[] | undefined;
  authors: any[] | undefined;
  events: any[] | undefined;
}

export const AdminTabs = ({ 
  activeTab, 
  setActiveTab, 
  articles, 
  categories, 
  authors, 
  events 
}: AdminTabsProps) => {
  const tabs = [
    { key: 'articles' as const, label: 'Articles', count: articles?.length },
    { key: 'categories' as const, label: 'Categories', count: categories?.length },
    { key: 'authors' as const, label: 'Authors', count: authors?.length },
    { key: 'events' as const, label: 'Events', count: events?.length },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.key
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label} ({tab.count || 0})
          </button>
        ))}
      </nav>
    </div>
  );
};
