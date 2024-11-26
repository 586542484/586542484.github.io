set -x
node -v
npm -v
npm config set strict-ssl false
npm config set registry  https://registry.npm.wps.cn
npm config set @ecis:registry https://registry.npm.wps.cn
type pnpm
if [ $? -ne 0 ];then
    npm install pnpm@latest-8 -g
    echo "pnpm package installed"
fi

pnpm install
echo "submodule..."
git submodule init
git submodule update --remote --merge
echo "submodule done"



echo "build jscore..."
# 编译jscore
cd packages/jscore
# pnpm install
pnpm build
cd ../../
echo "build jscore done"

# echo "build gendoc..."
# # 编译jscore
# cd packages/gendoc
# # pnpm install
# pnpm build
# cd ../../
# echo "build gendoc done"

echo "build sandbox..."
cd packages/sandbox
# pnpm install
pnpm build
cd ../../
echo "build sandbox done"

echo "build permission..."
cd packages/permission
# pnpm install
pnpm build
cd ../../
echo "build permission done"

echo "build mdl-runtime..."
cd packages/mdl/mdl-runtime
# pnpm install
pnpm build
cd ../../../
echo "build mdl-runtime done"


echo "build apps..."
# git submodule update
# git submodule foreach 'git pull origin dev_mini'
export top=$(pwd)
git submodule foreach --recursive \
  'b=$(git config -f ${top}/.gitmodules submodule.${path}.branch); \
   case "${b}" in \
     "") git switch ${sha1};; \
      *) git switch ${b}; git pull origin ${b};; \
   esac'
# git submodule foreach 'pnpm install --ignore-workspace'
pnpm install
git submodule foreach 'pnpm build'

echo "build apps done"

set -e
echo "build jssdk..."
cd packages/jssdk
# pnpm install
pnpm build
# pnpm dll
pnpm wsys
cd ../../
echo "build jssdk done"

# 删除注释文件
echo "delete LICENSE..."
find ./packages/jssdk/dist -type f -name *.LICENSE.* | xargs -I{} rm -rf {}
find ./packages/dll/dist -type f -name *.LICENSE.* | xargs -I{} rm -rf {}
echo "delete LICENSE done"
