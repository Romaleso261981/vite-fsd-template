import React from 'react';

interface ConditionCardProps {
  imageUrl: string;
  productUrl: string;
  title: string;
  reviewCount: string;
  oldPrice: string;
  currentPrice: string;
  buyButtonText?: string;
}

const ConditionCard: React.FC<ConditionCardProps> = ({
  imageUrl,
  productUrl,
  title,
  reviewCount,
  oldPrice,
  currentPrice,
  buyButtonText = 'Купити',
}) => {
  return (
    <div className="text-zinc-800 text-sm px-4 relative w-full min-h-[0.06rem] bg-stone-50 md:w-2/4 min-[992px]:w-2/4 min-[1200px]:w-1/3">
      <div className="bg-white pb-6 px-4 min-h-[21.25rem] mb-5 border-2 border-gray-200 border-solid">
        <div>
          <div className="py-3 absolute right-0 text-center top-[0.50rem] z-[9] w-12 h-24 text-cyan-600">
            <div>
              <a
                href="/"
                className="w-6 h-6 mt-2 border-2 border-zinc-200 border-solid rounded-2xl flex items-center justify-center"
                aria-label="Action"
              >
                <span className="sr-only">Action</span>
              </a>
            </div>
            <div>
              <a
                href="/"
                className="w-6 h-6 mt-2 border-2 border-zinc-200 border-solid rounded-2xl flex items-center justify-center"
                aria-label="Action"
              >
                <span className="sr-only">Action</span>
              </a>
            </div>
          </div>

          <div className="text-center min-h-[12.50rem] text-cyan-600">
            <a href={productUrl}>
              <div className="cursor-pointer">
                <img
                  className="w-auto h-48 max-w-full max-h-[12.50rem]"
                  id="img-1"
                  src={imageUrl}
                  alt={title}
                />
              </div>
            </a>
          </div>

          <div>
            <span className="font-bold min-h-[1.88rem] mb-3 text-sky-700" id="span-1">
              <a href={productUrl}>{title}</a>
            </span>

            <div className="table mb-3 text-yellow-600">
              <div className="mb-3.5">
                <div>
                  <span className="flex">
                    <span className='text-blue-400 bg-[url("https://air-conditioner.ua/img/icons/rating_y.png")] bg-repeat-x text-xs align-middle inline-block h-4'>
                      <span
                        className='bg-[url("https://air-conditioner.ua/img/icons/rating_y.png")] bg-repeat-x h-4 max-w-[5.31rem]'
                        style={{
                          backgroundPosition: '0px -16px',
                        }}
                      />
                    </span>

                    <a
                      className="text-slate-400 float-left text-[0.63rem]"
                      href={`${productUrl}#comments`}
                    >
                      <span className="text-blue-400 cursor-pointer text-xs ml-1">
                        {reviewCount} відгук
                      </span>
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <form
              action="https://air-conditioner.ua/cart"
              className="min-[220px]:w-full min-[220px]:p-0"
            >
              <div className="-m-1">
                <div className="float-left px-1.5 relative min-h-[0.06rem] min-[992px]:w-2/4">
                  <div>
                    <div>
                      <div className="text-sky-700">Ціна</div>
                      <span className="text-xs left-[3.13rem] absolute line-through top-[0.13rem]">
                        {oldPrice}
                      </span>
                      <div className="text-zinc-800 text-lg font-bold">
                        {currentPrice} <span className="text-base">₴</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="float-left px-1.5 min-h-[0.06rem] text-white min-[992px]:w-2/4">
                  <a
                    className="bg-sky-700 py-2 px-5 text-center align-middle inline-block w-full rounded-sm"
                    href={productUrl}
                  >
                    {buyButtonText}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConditionList: React.FC = () => {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '@media (max-width: 1200px) {\n#img-1 {\nmax-width: 100% !important; display: block !important; margin-top: 0px !important; margin-right: auto !important; margin-bottom: 0px !important; margin-left: auto !important;\n}\n}\n@media (max-width: 991px) {\n#span-1 {\nmargin-top: 10px !important;\n}\n}\n',
        }}
      />
      <ConditionCard
        imageUrl="https://air-conditioner.ua/files/thumbnail/hec-on-off-3-453x453-logo100.webp?v=1.0"
        productUrl="https://air-conditioner.ua/uk/kondicioner-hec-hec-07qci-hec-07qco.html"
        title="Кондиціонер HEC HEC-07QC(I)/HEC-07QC(O) оn/оff"
        reviewCount="1"
        oldPrice="9980"
        currentPrice="9512"
      />
    </div>
  );
};

export default ConditionList;
