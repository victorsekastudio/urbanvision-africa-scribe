
export const EditorNote = () => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
              Editor's Note
            </h3>
            <blockquote className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed font-serif mb-6">
              "As African cities prepare to house over 750 million people by 2030, the conversations 
              we're having today about infrastructure, sustainability, and innovation will determine 
              the quality of life for generations to come."
            </blockquote>
            <footer className="text-gray-600">
              <cite className="font-medium">UrbanVision team</cite>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};
