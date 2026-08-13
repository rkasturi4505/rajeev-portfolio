export interface Project {

name:string;
organization:string;
role:string;
duration:string;
domain:string;
teamSize:string;
technologies:string;

overview:string;
businessProblem:string;

responsibilities:string;

architecture:string;
challenges:string;
solution:string;

businessImpact:string;
keyAchievements:string;
keyLearnings:string;

}

export interface EducationItem {
  degree: string;

  institution: string;

  year: string;
}

export interface Certification {
  name: string;

  issuer: string;

  certificateUrl: string;
}

export interface Profile {
  name: string;

  title: string;

  experience: string;

  summary: string;

  image: string;

  roles: string[];

  skills: string[];

  certifications: Certification[];

  education: EducationItem[];
}

export interface Portfolio {
  profile: Profile;

  projects: Project[];
}
