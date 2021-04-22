import { Injectable } from '@angular/core';

export interface Video {
  title: string;
  url: string;
  thumb: string;
  subtitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videos: Video[] = [
    {
      url: "../assets/video/video1.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/angular_ionic.png",
      title: "Débuter avec ionic et angular"
    },
    {
      url: "../assets/video/video2.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/life_cycle.png",
      title: "Angular - Cycle de vie de l'application"
    },
    {
      url: "../assets/video/video3.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/ionic-crash-course.png",
      title: "Débuter avec ionic"
    },
    {
      url: "../assets/video/video4.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/cover-image.png",
      title: "Développez votre application avec ionic et angular"
    },
    {
      url: "../assets/video/video5.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/pass-data-router.png",
      title: "Angular - Le Router"
    },
    {
      url: "../assets/video/video6.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/firebase.jpg",
      title: "Angular et firebase"
    },
    {
      url: "../assets/video/video7.mp4",
      subtitle: "By imie",
      thumb: "../assets/img/variable_env.jpeg",
      title: "Les variables d'environnements avec angular"
    }
  ];


  constructor() { }

  public getVideos(): Video[] {
    return this.videos;
  }
}
