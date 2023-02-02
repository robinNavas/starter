import { Transition } from '@unseenco/taxi';
import gsap from 'gsap';

export default class MainTransition extends Transition {
  onLeave({ from, done }) {
    // console.log('------ 🛫 Leave transition ------')

    gsap.to(from, {
      opacity: 0,
      onComplete: () => {
        done();
      },
    });
  }

  onEnter({ to, done }) {
    // console.log('------ 🛬 Land transition ------')
    gsap.fromTo(
      to,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        onComplete: () => {
          done();
        },
      },
    );
  }
}
