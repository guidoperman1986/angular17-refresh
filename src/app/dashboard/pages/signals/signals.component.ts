import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface VideoForm {
  videoTitle: FormControl<string | null>
  hours: FormControl<number | null>
  minutes: FormControl<number | null>
}

interface Video {
  id: number;
  title: string;
  duration: number;
}

@Component({
  selector: 'app-signals',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export default class SignalsComponent implements OnInit {
  fb = inject(FormBuilder);
  videoForm!: FormGroup;
  dailyFreeTime = new FormControl(60, [Validators.required, Validators.min(1), Validators.max(1440)]);
  videos = signal<Video[]>([]);

  totalVideoTime = computed(() => {
    return this.videos().reduce((total, video) => total + video.duration, 0);
  });

  dailyRemainingTime = computed(() => {
    return this.dailyFreeTime.value! - this.totalVideoTime();
  });

  daysNeeded = computed(() => {    
    return Math.ceil(this.totalVideoTime() / this.dailyFreeTime.value!);
  });

  ngOnInit(): void {
    this.videoForm = this.fb.group<VideoForm>({
      videoTitle: new FormControl('', Validators.required),
      hours: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1000)]),
      minutes: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(59)]),
    });

    this.loadVideos();
  }

  loadVideos() {
    const videos = localStorage.getItem('videos');
    if (videos) {
      this.videos.set(JSON.parse(videos));
    }
  }

  addVideo() {
    const video: Video = {
      id: this.videos().length + 1,
      title: this.videoForm.value.videoTitle!,
      duration: this.videoForm.value.hours! * 60 + this.videoForm.value.minutes!
    };
    this.videos.set([...this.videos(), video]);

    this.saveVideos();
    this.videoForm.reset({
      videoTitle: '',
      hours: 0,
      minutes: 0,
    });
  }

  removeVideo(id: number) {
    this.videos.update((videos) => {
      return videos.filter((video) => video.id !== id);
    });

    this.saveVideos();
  }

  saveVideos() {
    localStorage.setItem('videos', JSON.stringify(this.videos()));
  }

  formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  }



}
