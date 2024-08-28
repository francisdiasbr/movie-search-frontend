import { figtree } from './fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${figtree.className} flex flex-row items-center leading-none text-white`}
    >
      <p className='text-[44px]'>Movie Search</p>
    </div>
  );
}
