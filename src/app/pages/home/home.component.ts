import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step { title: string; text: string; }
interface Hackathon { field: string; name: string; text: string; status: 'live' | 'open' | 'soon'; label: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  /** Repeated twice so the CSS marquee loops seamlessly. */
  readonly ticker = Array.from({ length: 2 }, () => ['Build', 'Compete', 'Ship', 'Learn', 'Team up', 'Win']).flat();

  readonly steps: Step[] = [
    { title: 'Discover', text: 'Find a challenge that makes you want to build.' },
    { title: 'Team up', text: 'Find people who share your ambition.' },
    { title: 'Build', text: 'Turn your idea into something people can use.' },
    { title: 'Ship', text: 'Submit your work and take it to the arena.' },
  ];

  readonly hackathons: Hackathon[] = [
    { field: 'Artificial intelligence', name: 'AI Innovation', text: 'Build intelligent solutions for problems that matter.', status: 'live', label: 'Live now' },
    { field: 'Web development', name: 'Future Web', text: 'Design and ship the next generation of digital experiences.', status: 'open', label: 'Open' },
    { field: 'Smart technology', name: 'Campus Tech', text: 'Create technology that makes student life better.', status: 'soon', label: 'Coming soon' },
  ];

  readonly footerLinks = [
    { heading: 'Product', links: ['About', 'Hackathons', 'How it works', 'Community'] },
    { heading: 'Builders', links: ['Students', 'Teams', 'Organizers', 'Developers'] },
    { heading: 'Guides', links: ['Hackathon rules', 'FAQ', 'Support', 'Contact'] },
  ];
}
