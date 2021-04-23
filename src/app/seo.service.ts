import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { environment as env } from '../environments/environment';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface TypingSEO {
  title?: string;
  titleSuffix?: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
}

export interface TypingProperty {
  property: string;
  itemprop?: string;
  content: string;
}

export interface TypingName {
  name: string;
  itemprop?: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {

  private baseUrl = env.baseUrl;
  private titleSuffix = env.title;

  private sub?: Subscription;

  constructor(private meta: Meta, private title: Title, private router: Router) {}

  /**
   * @description Set SEO tags based on route static data on every route change automatically
   * @return void
   */
  activate(): void {
    // If the user calls the method more than once the first reference gets lost
    // and we cannot unsubscribe from it and will cause memory leak
    // So, we first unsubscribe if we have an existing sub and then assign the sub again
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.router.events.pipe(
      filter(e => e instanceof ChildActivationEnd)
    ).subscribe(event => {
      let snapshot = (event as ChildActivationEnd).snapshot;

      while (snapshot.firstChild !== null) {
        snapshot = snapshot.firstChild;
      }

      const { data } = snapshot;

      this.setTags({
        title: data.title,
        titleSuffix: data.titleSuffix ?? this.titleSuffix,
        description: data.description,
        image: data.image,
        keywords: data.keywords
      });
    });
  }

  /**
   * @description Unsubscribes from the subscription activated on activate() method.
   * If you don't call activate() again, seo tags won't be set automatically anymore
   */
  deactivate(): void {
    this.sub?.unsubscribe();
  }

  // this.seo.setTags({
  //   title: 'Home', // Title
  //   titleSuffix: '- Knoxpo', // Title Suffix
  //   description: 'Your description', // Description
  //   image: 'https://storage.googleapis.com/knoxpo/cover.png', // Image
  //   keywords: 'mobile, android, ios, swift, cloud development' // Keywords
  // });

  /**
   * @description Set General SEO Tags
   * @param config: TypingSEO
   * @return void
   */
  setTags(config: TypingSEO): void {
    if (config?.title) {
      this.setTitle(config.title, config.titleSuffix);
    }
    if (config?.description) {
      this.setDescription(config.description);
    }
    if (config?.image) {
      this.setImage(config.image);
    }
    if (config?.keywords) {
      this.setKeywords(config.keywords);
    }
    if (config?.url) {
      this.setUrl(config.url);
    }
  }

  /**
   * @description Set Name Tag
   * @param typingName: TypingName
   * @return void
   */
  setNameTag(typingName: TypingName): void {
    const { name, content, itemprop = '' } = typingName;

    const property: MetaDefinition = {
      name,
      content,
      itemprop: itemprop ?? ''
    };

    if (this.meta.getTag(`name="${ name }"`)) {
      this.meta.updateTag(property);
    } else {
      this.meta.addTag(property);
    }
  }

  /**
   * @description Set Name Tags
   * @param names: [TypingName]
   * @return void
   */
  setNameTags(names: [ TypingName ]): void {
    names.forEach(prop => {
      this.setNameTag(prop);
    });
  }

  /**
   * @description Set Property Tag
   * @param typingProp: TypingProperty
   * @return void
   */
  setPropertyTag(typingProp: TypingProperty): void {
    const { property, content, itemprop = '' } = typingProp;

    const prop: MetaDefinition = { property, content, itemprop };

    if (this.meta.getTag(`property="${ property }"`)) {
      this.meta.updateTag(prop);
    } else {
      this.meta.addTag(prop);
    }
  }

  /**
   * @description Set Property Tags
   * @param props: [TypingProperty]
   * @return void
   */
  setPropertyTags(props: [ TypingProperty ]): void {
    props.forEach(prop => {
      this.setPropertyTag(prop);
    });
  }

  /**
   * @description Set URL Tag
   * @param content: string
   * @return void
   */
  setUrl(content: string): void {
    this.meta.updateTag({ property: 'og:url', itemprop: 'url', content: `${ this.baseUrl }${ content }` });
  }

  /**
   * @description Set Title Tag
   * @param title: string
   * @param titleSuffix: string
   * @return void
   */
  setTitle(title: string, titleSuffix?: string): void {
    const setTitle = (titleSuffix !== undefined && titleSuffix !== '') ? `${ title } - ${ titleSuffix }` : title;
    this.title.setTitle(setTitle);
    this.setPropertyTag({ property: 'og:title', itemprop: 'title', content: setTitle });
    this.setPropertyTag({ property: 'twitter:title', itemprop: 'title', content: setTitle });
  }

  /**
   * @description Set Description Tag
   * @param content: string
   * @return void
   */
  setDescription(content: string): void {
    this.setNameTag({ name: 'description', itemprop: 'description', content });
    this.setPropertyTag({ property: 'og:description', itemprop: 'description', content });
    this.setPropertyTag({ property: 'twitter:description', itemprop: 'description', content });
  }

  /**
   * @description Set Image Tag
   * @param content: string
   * @return void
   */
  setImage(content: string): void {
    this.setPropertyTag({ property: 'twitter:image', itemprop: 'image', content });
    this.setPropertyTag({ property: 'og:image', itemprop: 'image', content });
    this.setPropertyTag({ property: 'og:image:secure_url', itemprop: 'image', content });
  }

  /**
   * @description Set Keywords Tag
   * @param content: string
   * @return void
   */
  setKeywords(content: string): void {
    this.setNameTag({ name: 'keywords', itemprop: 'keywords', content });
  }

}
