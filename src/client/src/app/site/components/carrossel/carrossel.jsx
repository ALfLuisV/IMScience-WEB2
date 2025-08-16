"use client";

import { Carousel, ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

function CarouselCardGenerator() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 32,
            dotWidth: 48,
            dotHeight: 8,
          },
        },
        token: {
          colorPrimary: '#156D86',
        },
      }}
    >
      <div>
        <Carousel effect="fade" autoplay arrows speed={900} autoplaySpeed={4000}>
          <div className="h-[32rem] bg-cover bg-center">
            <div
              className="h-[32rem]"
              style={{
                zIndex: '15',
                backgroundSize: '100% 100%',
                backgroundPosition: '0px 0px',
                backgroundImage:
                  'radial-gradient(200% 200% at 129% 22%, #073AFF00 29%, #156d86 54%)',
                paddingTop: '220px',
              }}
            >
              <div className="w-[30%] ml-14">
                {/* conteúdo */}
              </div>
            </div>
            <img
              id="backgroundImage"
              src={null}
              alt="backgroundImage"
              className="h-[32rem]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: '-1',
              }}
            />
          </div>


          <div className="h-[32rem] bg-cover bg-center">
            <div
              className="h-[32rem]"
              style={{
                zIndex: '15',
                backgroundSize: '100% 100%',
                backgroundPosition: '0px 0px',
                backgroundImage:
                  'radial-gradient(200% 200% at 129% 22%, #073AFF00 29%, #156d86 54%)',
                paddingTop: '220px',
              }}
            >
              <div className="w-[30%] ml-14">
                {/* conteúdo */}
              </div>
            </div>
            <img
              id="backgroundImage"
              src=""
              alt="backgroundImage"
              className="h-[32rem]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: '-1',
              }}
            />
          </div>

          <div className="h-[32rem] bg-cover bg-center">
            <div
              className="h-[32rem]"
              style={{
                zIndex: '15',
                backgroundSize: '100% 100%',
                backgroundPosition: '0px 0px',
                backgroundImage:
                  'radial-gradient(200% 200% at 129% 22%, #073AFF00 29%, #156d86 54%)',
                paddingTop: '220px',
              }}
            >
              <div className="w-[30%] ml-14">
                {/* conteúdo */}
              </div>
            </div>
            <img
              id="backgroundImage"
              src=""  
              alt="backgroundImage"
              className="h-[32rem]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: '-1',
              }}
            />
          </div>

          <div className="h-[32rem] bg-cover bg-center">
            <div
              className="h-[32rem]"
              style={{
                zIndex: '15',
                backgroundSize: '100% 100%',
                backgroundPosition: '0px 0px',
                backgroundImage:
                  'radial-gradient(200% 200% at 129% 22%, #073AFF00 29%, #156d86 54%)',
                paddingTop: '220px',
              }}
            >
              <div className="w-[30%] ml-14">
               {/* conteúdo */}
              </div>
            </div>
            <img
              id="backgroundImage"
              src=""  
              alt="backgroundImage"
              className="h-[32rem]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: '-1',
              }}
            />
          </div>


          <div className="h-[32rem] bg-cover bg-center">
            <div
              className="h-[32rem]"
              style={{
                zIndex: '15',
                backgroundSize: '100% 100%',
                backgroundPosition: '0px 0px',
                backgroundImage:
                  'radial-gradient(200% 200% at 129% 22%, #073AFF00 29%, #156d86 54%)',
                paddingTop: '220px',
              }}
            >
              <div className="w-[30%] ml-14">
              {/* conteúdo */}
              </div>
            </div>
            <img
              id="backgroundImage"
              src="" 
              alt="backgroundImage"
              className="h-[32rem]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: '-1',
              }}
            />
          </div>
        </Carousel>
      </div>
    </ConfigProvider>
  );
}

export default CarouselCardGenerator;
