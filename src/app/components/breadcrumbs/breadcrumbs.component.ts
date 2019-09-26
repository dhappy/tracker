import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router'
import { filter } from 'rxjs/operators'
import { Breadcrumb } from '../../models/Breadcrumb'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public crumbs: Breadcrumb[];

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
    this.crumbs = []
  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB:string = 'crumb'

    //subscribe to the NavigationEnd event
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      let root:ActivatedRoute = this.activatedRoute.root
      this.crumbs = this.getBreadcrumbs(root)
    })
  }

  private getBreadcrumbs(route:ActivatedRoute, url:string='', crumbs:Breadcrumb[]=[]):Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB:string = 'crumb'

    let children:ActivatedRoute[] = route.children

    if (children.length === 0) {
      return crumbs
    }

    for(let child of children) {
      if(child.outlet !== PRIMARY_OUTLET) {
        continue
      }

      let routeURL:string = child.snapshot.url.map(segment => segment.path).join('/')
      let text = child.snapshot.data[ROUTE_DATA_BREADCRUMB]

      url += `/${routeURL}`

      if(text !== false) {
        if(text === undefined) {
          text = routeURL
        }

        if(text !== '') {
          let breadcrumb:Breadcrumb = {
            text: text,
            params: child.snapshot.params,
            link: url
          }
     
          crumbs.push(breadcrumb)
        }
      }

      return this.getBreadcrumbs(child, url, crumbs)
    }
  }
}
