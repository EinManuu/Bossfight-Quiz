import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-create-boss',
  imports: [],
  templateUrl: './create-boss.html',
  styleUrl: './create-boss.css',
})
export class CreateBoss {
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private cdr: ChangeDetectorRef) {}


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;

      // 🔥 wichtig
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }
}
