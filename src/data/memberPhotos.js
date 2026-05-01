const PHOTO_FILES = {
  'Jiwoo': 'jiwoo.jpg',
  'Carmen': 'carmen.jpg',
  'Yuha': 'yuha.jpg',
  'Stella': 'stella.jpg',
  'Juun': 'juun.jpg',
  'A-na': 'ana.jpg',
  'Ian': 'ian.jpg',
  'Ye-on': 'yeon.jpg',
}

const PHOTO_FOLDERS = {
  polaroid: '/images/members/polaroid',
  magazine: '/images/members/magazine',
  minimal: '/images/members/minimal',
}

export function getMemberPhoto(memberName, style = 'polaroid') {
  const file = PHOTO_FILES[memberName]
  const folder = PHOTO_FOLDERS[style] || PHOTO_FOLDERS.polaroid

  return file ? `${folder}/${file}` : null
}
