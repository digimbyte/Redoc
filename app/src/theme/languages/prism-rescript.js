module.exports = function (Prism) {
    Prism.languages.rescript = Prism.languages.extend('gdscript', {
      // Extend or override GDScript rules for REScript
      // Add REScript-specific syntax here
      'keyword': /\b(func|var|if|else|for|while|return|class|rescript_specific_keyword)\b/,
      // Add more REScript-specific tokens
    });
  };
  