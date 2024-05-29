const getLanguage = (language: any[], locale: string | undefined) => {
  return language?.filter((item) => item.locale === locale)[0]
}

export default getLanguage
