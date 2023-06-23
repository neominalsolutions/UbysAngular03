import { Component, OnInit } from '@angular/core';
import {
  catchError,
  concat,
  delay,
  delayWhen,
  filter,
  finalize,
  forkJoin,
  from,
  interval,
  map,
  merge,
  mergeMap,
  mergeMapTo,
  of,
  retry,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';

import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'rxjs-operators',
  templateUrl: './rxjs-operators.component.html',
  styleUrls: ['./rxjs-operators.component.css'],
})
export class RxjsOperatorsPageComponent implements OnInit {
  ngOnInit(): void {
    // from ile senkron bir değişken observable tipine dönüştürülebilir.
    const ObsArray = from([1, 2, 3, 4]); // observable yaptı
    // ObsArray.subscribe((val) => {
    //   console.log('from operator', val);
    // });

    // dizi birleştirme (sıralı bir birleştirme yapar)
    const concatArray = concat(
      ObsArray.pipe(delay(100)),
      from([15, 6, 17, 8])
    ).subscribe((val) => {
      console.log('concat', val);
    });

    const mergeArray2 = merge(
      ObsArray.pipe(delay(100)),
      from([15, 6, 17, 8])
    ).subscribe((res) => {
      console.log('merge', res);
    });

    const arr2 = [5, 6, 7, 8];
    let arr3: any[] = [];

    setTimeout(
      () => {
        arr3 = arr2.concat(arr2); // JS
      },
      100,
      () => {
        const arr4 = arr3.filter((x) => x > 10);
      }
    );

    // lodash

    // pipe ile observable olan değerlere operatörler vasıtası ile belirli özellikler kazandırırız.
    // pipe subscribe işlemi öncesinde çalışıyor.
    // pipe içinde tanımlanan operatöre göre veri üzerinde bir işlem yapılıp.
    // subscribe kısmında işlem yapılmış veriye abone olunuyor.
    // dizi birleştirme
    merge(ObsArray.pipe(delay(100)), from([15, 6, 17, 8]))
      .pipe(filter((val) => Number(val) > 10))
      .subscribe((val) => {
        console.log('merge-filter', val);
      });

    // settimeout kullanmak yerine timer operatör kullanırız
    const source1 = timer(1000);

    const sub1 = source1.subscribe((val) => {
      console.log('1sn geçikmeli val geldi');
    });

    sub1.unsubscribe();

    // setInterval 1sn de bir değer üreticek

    const source2 = interval(1000).subscribe((counter) => {
      console.log('interval', counter);
    });

    const data$ = from(
      fetch('https://jsonplaceholder.typicode.com/todos')
    ).pipe(
      // json serialize işlemi yaptık)
      mergeMap((data: any) => {
        return data.json();
      }),
      tap((data: any) => {
        // auditleme yada bir eylem yapmamız için veriyi yakalırız.
        // console.log('data-stream', data);
        localStorage.setItem('todos', data);
        // loader service çalıştırılması veya notify işlemi

        return data;
      }),
      map((data: any) => {
        // console.log('data-stream', data);
        // veri üzerinde bir maniplasyon yapmamızı sağlayan bir teknik
        // data üzerinde bir filtereleme yaptık
        const res = data.filter((x: any) => x.completed == true);

        // veri ile oynadık
        const response = {
          isSuccess: true,
          status: 200,
          response: res,
        };

        console.log('filtred-response', response);

        // return throwError(() => 'throw error'); // js deki hata fırlatma yönteminin rxJs tarafındaki hali

        return response;
      }),
      catchError((err) => {
        // err response yerine kendi hata mesaj response verebilir.
        // hata olunca loading false
        return of('Veri çekme hatası');
      }),
      delayWhen(() => fetch('https://jsonplaceholder.typicode.com/posts')), // posts verisi çekilene kadar todos apidan veri çekmeyi beklet.
      retry(3), // eğer api istek attığında erişilemez ise 3 kere dene (retry policy) recilency
      finalize(() => {
        // finalize ise loading hide et.
        // try catch finally bloğundaki finally benzer
      })
    );

    data$.subscribe({
      next: (response) => {
        // console.log('response', response);
      },
      error: (err) => {
        // hatayı yakaladığımız kısım
      },
      complete() {
        // akış tammalanınca yapılacak işlemler.
      },
    });

    var s = ajax
      .getJSON('https://jsonplaceholder.typicode.com/users')
      .pipe(
        switchMap((response) => {
          console.log('ilk-req', response);
          return forkJoin({
            res1: of(response),
            res2: ajax.getJSON('https://jsonplaceholder.typicode.com/posts'),
          });

          // return from(
          //   concat([
          //     of(response),
          //     ajax.getJSON('https://jsonplaceholder.typicode.com/posts'),
          //   ])
          // );
        })
      )
      .subscribe((allRes) => {
        console.log('allRes', allRes);
      });

    // Burası subscribe sonrası direk çağırılmaz.
    // sadece NgOnDestroyda çalıştırırız.
    // s.unsubscribe();

    // birden fazla api üzerinden veri çekmemizi sağlayan bir yöntem
    forkJoin({
      google: ajax.getJSON('https://api.github.com/users/google'),
      microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
    })
      .pipe(
        map((response: any) => {
          // data mapping
          console.log('forkJoin-response', response);

          return {
            nodeIds: [response.microsoft.node_id, response.google.node_id],
          };
        }),
        // retry(3), // retry policy
        finalize(() => {
          // finalize ise loading hide et.
          // try catch finally bloğundaki finally benzer
        }),
        catchError((err) => {
          console.log('err', err);
          // error nesnesni güncelleyip kendi hata formatına döndürebiliriz.
          return err;
        })
      )
      .subscribe((mappingData) => {
        console.log('data', mappingData);
      });
  }
}
