function UUID() {
  const CHARACTERS = '0123456789abcdef';
  const sections = [8, 4, 4, 4, 12];

  const uuidSections = sections.map(sectionLength => {
    let section = '';
    for (let idx = 0; idx < sectionLength; idx++) {
      let randomCharacter = CHARACTERS[
        Math.floor(Math.random() * CHARACTERS.length)
      ];
      section += randomCharacter;
    }
    return section;
  });

  return uuidSections.join('-');
}

console.log(UUID());