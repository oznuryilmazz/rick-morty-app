# Rick and Morty Characters

Rick and Morty API kullanarak karakter listeleme ve filtreleme yapan bir Next.js uygulaması.

## Kullanılan Teknolojiler

- Next.js 16 (App Router, SSR)
- TypeScript
- Tailwind CSS
- React Query
- Zustand
- nuqs (URL query state)
- Axios

## Özellikler

- Karakterleri `status` ve `gender` filtreleriyle listeleme
- Filtrelerin URL üzerinden yönetilmesi (`?status=alive&gender=male`)
- Filtre değişiminde SSR ile güncel veri çekilmesi
- React Query ile veri cache/prefetch akışı
- Zustand ile seçili karakter ve filtre state yönetimi
- Light/Dark tema desteği

## Proje Yapısı

```text
app/
  layout.tsx
  page.tsx
  providers.tsx
components/
  character/
  filters/
  theme/
  ui/
hooks/
lib/
services/
store/
types/
```

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

Varsayılan olarak `http://localhost:3000` adresinde açılır. Port doluysa Next.js uygun bir porta geçer.

## Komutlar

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint kontrolü
npm run typecheck  # TypeScript type check
npm run format     # Prettier formatlama
```

## Kod Kalitesi

- ESLint + Prettier yapılandırması mevcut
- `any` kullanımı ESLint ile engelleniyor
- Husky + lint-staged aktif
- Pre-commit aşamasında:
  - staged dosyalar lint/format edilir
  - proje genelinde `lint` ve `typecheck` çalışır

## API

Kullanılan endpoint:

- `GET https://rickandmortyapi.com/api/character`

Filtre parametreleri:

- `status`: `alive | dead | unknown`
- `gender`: `male | female | genderless | unknown`
