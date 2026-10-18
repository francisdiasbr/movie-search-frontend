import { useLanguage } from '../../../language/LanguageProvider';
import { Language } from '../../../userPreferences/types';
import * as S from './styles';

const languages: Array<{ code: Language; name: string }> = [
  { code: 'en', name: 'EN' },
  { code: 'pt', name: 'PT' },
];

// Global language switch in the nav bar. The selected language is the filled
// option; every screen that shows movie texts reads it through useLanguage.
const LanguageSelector = () => {
  const { changeLanguage, language } = useLanguage();

  return (
    <S.Group aria-label='Idioma dos textos' role='group'>
      {languages.map(option => (
        <S.Option
          $active={option.code === language}
          aria-pressed={option.code === language}
          key={option.code}
          onClick={() => changeLanguage(option.code)}
          type='button'
        >
          {option.name}
        </S.Option>
      ))}
    </S.Group>
  );
};

export default LanguageSelector;
