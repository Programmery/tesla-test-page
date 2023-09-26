import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
});
afterEach(jest.resetModules);

describe('Inputs have valid attributes', () => {
  test('Input with a range of speeds from 70 to 140 km/h using steps of 10km', () => {
    const input = document.querySelector<HTMLInputElement>('input#kmh');
    expect(input?.step).toBe('10');
    expect(input?.min).toBe('70');
    expect(input?.max).toBe('140');
    expect(input?.value).toBe('80');
  });

  test('Input with a range of temperatures from -10º to 40º using steps of 10º', () => {
    const input = document.querySelector<HTMLInputElement>('input#temp');
    expect(input?.step).toBe('10');
    expect(input?.min).toBe('-10');
    expect(input?.max).toBe('40');
    expect(input?.value).toBe('10');
  });

  test('A toggle for air conditioner/heating system', () => {
    const input = document.querySelector<HTMLInputElement>('input#ac[type="checkbox"]');
    expect(input).not.toBeNull();
  });

  test('A wheel size selection with 19" and 21".', () => {
    const input19 = document.querySelector<HTMLInputElement>('input[type="radio"][value="19"]');
    const input21 = document.querySelector<HTMLInputElement>('input[type="radio"][value="21"]');
    expect(input19).not.toBeNull();
    expect(input21).not.toBeNull();
  });
});

describe('HTML template is valid', () => {
  test('Page has a valid header', () => {
    expect(document.querySelector('.header')).not.toBeNull();
    expect(document.querySelector('.header__parallax')).not.toBeNull();
    expect(document.querySelector('.header__image')).not.toBeNull();
    expect(document.querySelector('.header__branding')).not.toBeNull();
    expect(document.querySelector('.header__nav')).not.toBeNull();
    expect(document.querySelector('.header__button-container')).not.toBeNull();
    expect(document.querySelector('.header__menu-button')).not.toBeNull();
    expect(document.querySelector('.header__menu')).not.toBeNull();
    expect(document.querySelector('.header__image-overlay')).not.toBeNull();
  });

  test('Page has valid Main content', () => {
    expect(document.querySelector('.main')).not.toBeNull();
    expect(document.querySelector('.intro')).not.toBeNull();

    expect(document.querySelector('.intro__title._observed-fade-in')).not.toBeNull();

    expect(document.querySelector('.intro__subtitle._observed-fade-in')).not.toBeNull();
    expect(document.querySelector(`a[href="#calculator"]`)).not.toBeNull();

    expect(document.querySelector(`.scroll-button__circle img`)).not.toBeNull();

    expect(document.querySelector(`.calculation`)).not.toBeNull();
    expect(document.querySelector(`.calculation__title`)).not.toBeNull();

    expect(document.querySelectorAll(`.car-demo img`).length).toBe(3);

    expect(document.querySelector(`noscript`)).not.toBeNull();

    expect(document.querySelector(`.calculator`)).not.toBeNull();
    expect(document.querySelector(`.calculator__results`)).not.toBeNull();
    expect(document.querySelector(`.calculation__disclaimer`)).not.toBeNull();
    expect(document.querySelectorAll(`.calculator__result`).length).toBe(2);

    expect(document.querySelectorAll(`.calculator__fields .calculator__field-group`).length).toBe(3);
  });

  test('Page has a valid footer', () => {
    expect(document.querySelectorAll('.footer .footer__content .footer__group').length).toBe(4);
  });

  test('Page has a cursor animation overlay', () => {
    expect(document.querySelectorAll('.overlay .cursor .cursor__circle[aria-hidden="true"]')).not.toBeNull();
  });
});
