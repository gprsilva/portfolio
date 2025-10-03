const CodeBlock = () => {
  const codeContent = `const developer = {
  name: 'Guilherme',
  role: 'Full Stack Developer',
  skills: [
    'Python',
    'Django',
    'JavaScript',
    'SQL'
  ],
  location: 'Brasil'
}`;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 font-mono text-sm max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-xs ml-2">developer.js</span>
      </div>
      
      <pre className="text-gray-300 leading-relaxed">
        <code>
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-300">developer</span>{' '}
          <span className="text-white">=</span>{' '}
          <span className="text-white">{'{'}</span>
          {'\n  '}
          <span className="text-red-300">name</span>
          <span className="text-white">:</span>{' '}
          <span className="text-green-300">'Guilherme'</span>
          <span className="text-white">,</span>
          {'\n  '}
          <span className="text-red-300">role</span>
          <span className="text-white">:</span>{' '}
          <span className="text-green-300">'Full Stack Developer'</span>
          <span className="text-white">,</span>
          {'\n  '}
          <span className="text-red-300">skills</span>
          <span className="text-white">:</span>{' '}
          <span className="text-white">[</span>
          {'\n    '}
          <span className="text-green-300">'Python'</span>
          <span className="text-white">,</span>
          {'\n    '}
          <span className="text-green-300">'Django'</span>
          <span className="text-white">,</span>
          {'\n    '}
          <span className="text-green-300">'JavaScript'</span>
          <span className="text-white">,</span>
          {'\n    '}
          <span className="text-green-300">'SQL'</span>
          {'\n  '}
          <span className="text-white">],</span>
          {'\n  '}
          <span className="text-red-300">location</span>
          <span className="text-white">:</span>{' '}
          <span className="text-green-300">'Brasil'</span>
          {'\n'}
          <span className="text-white">{'}'}</span>
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
