import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Document } from '../documents.model'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      "1",
      "A computer program development for sizing stand-alone photovoltaic-wind hybrid systems",
      "Abstract The exhaustion and all the drawbacks of fossil fuels are the main elements that led to the development and use of new alternativesfor power generation based on renewable energy,amongthem: photovoltaic energy systems, windenergy systems and their combination in a hybrid photovoltaic-wind system. In this paper we proposed a sizing approach of stand-alone Photovoltaic-Wind systems which is evaluated by the development of a computer applicationbased essentially on Loss of Power Supply Probability (LPSP) algorithmto provide an optimal technical-economic configuration. An example of a PV-Wind plant sizing is presented and discussed.",
      "https://cyberleninka.org/article/n/518.pdf",
      null,
    ),
    new Document(
      "2",
      "A component-based process with separation of concerns for the development of embedded real-time software systems",
      "Abstract Numerous component models have been proposed in the literature, a testimony of a subject domain rich with technical and scientific challenges, and considerable potential. Unfortunately however, the reported level of adoption has been comparatively low. Where successes were had, they were largely facilitated by the manifest endorsement, where not the mandate, by relevant stakeholders, either internal to the industrial adopter or with authority over the application domain. The work presented in this paper stems from a comprehensive initiative taken by the European Space Agency (ESA) and its industrial suppliers. This initiative also enjoyed significant synergy with interests shown for similar goals by the telecommunications and railways domain, thanks to the interaction between two parallel project frameworks. The ESA effort aimed at favouring the adoption of a software reference architecture across its software supply chain. The center of that strategy revolves around a component model and the software development process that builds on it. This paper presents the rationale, the design and implementation choices made in their conception, as well as the feedback obtained from a number of industrial case studies that assessed them.",
      "https://cyberleninka.org/article/n/797.pdf",
      null,
    ),
    new Document(
      "3",
      "DOA estimation for attitude determination on communication satellites",
      "Abstract In order to determine an appropriate attitude of three-axis stabilized communication satellites, this paper describes a novel attitude determination method using direction of arrival (DOA) estimation of a ground signal source. It differs from optical measurement, magnetic field measurement, inertial measurement, and global positioning system (GPS) attitude determination. The proposed method is characterized by taking the ground signal source as the attitude reference and acquiring attitude information from DOA estimation. Firstly, an attitude measurement equation with DOA estimation is derived in detail. Then, the error of the measurement equation is analyzed. Finally, an attitude determination algorithm is presented using a dynamic model, the attitude measurement equation, and measurement errors. A developing low Earth orbit (LEO) satellite which tests mobile communication technology with smart antennas can be stabilized in three axes by corporately using a magnetometer, reaction wheels, and three-axis magnetorquer rods. Based on the communication satellite, simulation results demonstrate the effectiveness of the method. The method could be a backup of attitude determination to prevent a system failure on the satellite. Its precision depends on the number of snapshots and the input signal-to-noise ratio (SNR) with DOA estimation.",
      "https://cyberleninka.org/article/n/1431.pdf",
      null,
    ),
    new Document(
      "4",
      "Energy efficient partition-lightpath scheme for ip over WDM core networks",
      "Abstract In this paper, the research focus on the development of energy saving schemes with roots in sleep modes that support the evolution of greener core optical IP networks. The cornerstone of the adopted strategy is partition-lightpath schemes underpinned by the hibernation state implemented through a modification of the intelligent control plane, in particular for transparent network architectures under different scenarios. An enhanced multi-level operational hibernation mode through partition-lightpath was defined including functionality, structure considering its implementation issues. Through the use of appropriate design parameters the impact on blocking probability, wavelengths assignment, LSP connection requests, degree of node connectivity and network utilization can be minimized while also achieving energy savings. Evaluation of this scheme indicates potential reduction in power consumption from 9% up to 17% at the expense of reduced network performance.",
      "https://cyberleninka.org/article/n/1515991.pdf",
      null,
    ),
    new Document(
      "5",
      "A UML model for mobile game on the Android OS",
      "Abstract In order to promote the mobile games to keep up with the new technologies development, the mobile game of Gallant Fighter with Double Blade based on the Android OS designed in this paper applies various techniques, especially for the gravity sensing, such as object pool, multi-threaded, socket connection, maps and etc. The game management, the service class, the sound manager class, the game view class, the pass tips window class, and the rank window class are designed by UML model respectively. Experiments demonstrated its performance and proved that this model is meaningful and useful to develop other online mobile games. The UML model supports the game development and provides happiness for players in the leisure time.",
      "https://cyberleninka.org/article/n/5699.pdf",
      null,
    ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document)
  }

}
