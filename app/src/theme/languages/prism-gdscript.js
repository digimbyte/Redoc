module.exports = function (Prism) {
    Prism.languages.gdscript = {
      // Define the syntax highlighting rules for GDScript here
      // This is a simplified example; you should expand this to cover all GDScript syntax
      'comment': /#.*/,
      'string': {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      'keyword': /\b(func|var|if|else|for|while|return|class)\b/,
      'number': /\b\d+(\.\d+)?\b/,
      'operator': /[-+/*=<>!]+/,
      'punctuation': /[{}[\];(),.:]/
    };
  };
  