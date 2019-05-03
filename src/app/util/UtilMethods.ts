export function getOrDefault(value: any, def: any) {
  return !!value ? value : def;
}

export function getByKeyOrDefault(obj: Object, key: string, def: any) {
  try {
    return !!obj[key] ? obj[key] : def;
  } catch (e) {
    return def;
  }
}

export function getOptionById(options: any[], id: string, idKey: string = 'id') {
  for (const option of options) {
    if (option[idKey] === id) {
      return option;
    }
  }
  return null;
}

export function shorten(number: number, maxPlaces: number, forcePlaces: boolean, forceLetter: boolean) {
  number = Number(number);
  forceLetter = forceLetter || false;
  if (forceLetter !== false) {
    return annotate(number, maxPlaces, forcePlaces, forceLetter);
  }
  let abbr;
  if (number >= 1e12) {
    abbr = 'T';
  } else if (number >= 1e9) {
    abbr = 'B';
  } else if (number >= 1e6) {
    abbr = 'M';
  } else if (number >= 1e3) {
    abbr = 'K';
  } else {
    abbr = '';
  }
  return annotate(number, maxPlaces, forcePlaces, abbr);
}

function annotate(number, maxPlaces, forcePlaces, abbr) {
  // set places to false to not round
  let rounded: number | string = 0;
  switch (abbr) {
    case 'T':
      rounded = number / 1e12;
      break;
    case 'B':
      rounded = number / 1e9;
      break;
    case 'M':
      rounded = number / 1e6;
      break;
    case 'K':
      rounded = number / 1e3;
      break;
    case '':
      rounded = number;
      break;
  }
  if (maxPlaces !== false) {
    const test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
    if (test.test(('' + rounded))) {
      rounded = (rounded as number).toFixed(maxPlaces);
    }
  }
  if (forcePlaces !== false) {
    rounded = Number(rounded).toFixed(forcePlaces);
  }
  return rounded + abbr;
}
