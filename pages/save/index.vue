<template>
	<view class="container">
		
	<u-form labelPosition="above" :model="dishes">
		<u-form-item label="菜名" prop="name" >
			  <u-input
			    placeholder="请输入菜名"
			    border="bottom"
				v-model="dishes.name"
			    clearable
			  ></u-input>
		</u-form-item>
		<u-form-item label="图片" prop="image">
			<u-upload
				:fileList="files"
				@afterRead="afterRead"
				@delete="deletePic"
				name="pic"
				:maxCount="10"
				:previewFullImage="true"
			></u-upload>
		</u-form-item>
		<u-form-item label="价格" prop="price" >
			  <up-input
			    placeholder="请输入价格"
			    border="bottom"
				v-model="dishes.price"
				type="digit"
			    clearable
			  ></up-input>
		</u-form-item>
		<u-form-item label="描述" prop="description" >
			<u-textarea v-model="dishes.description" maxlength="100" placeholder="请输入内容" count ></u-textarea>
		</u-form-item>
		<u-form-item  prop="description" >
			<up-button type="primary" text="提交" @click="submit"></up-button>
		</u-form-item>
	</u-form>	
	
	
	</view>

</template>

<script setup>
	import { ref } from 'vue';
	const dishes = ref({
		name: '',
		image: '',
		description: '',
		price: null
	});
	const files = ref([
			
	]);
	
	const afterRead = (file) => {
		
		let path = file.file.url;
		let name = file.name;
		uni.uploadFile({
			url: 'https://ljguo.top/api/upload', //仅为示例，非真实的接口地址
			filePath: path,
			name: name,
			success: (res) => {
				files.value.push({
					url: JSON.parse(res.data).data
				});
				uni.showToast({
					title: '图片上传成功',
					duration: 1000
				})
			},
			fail: (err) => {
				console.log(err);
			}
		});
	}
	
	const saveCard = (data) => {
		uni.request({
			url: 'https://ljguo.top/api/save_cart',
			method: 'POST',
			data: data,
			success: (res) => {
				console.log(res.data);
			},
			fail: (err) => {
				console.log(err);
			}
		});
	}
	
	const deletePic = (e) => {
		files.value = [];
		let filePath = e.file.url;
		uni.request({
		    url: 'https://ljguo.top/api/delete_img?file_path=' + filePath,
			method: 'GET',
		    success: (res) => {
				// console.log(res.data);
				uni.showToast({
					title: '图片删除成功',
					duration: 1000
				})
		    }
		});

	}
	
	const submit = () => {
		dishes.value.image = files.value[0].url;
		uni.request({
		    url: 'https://ljguo.top/api/save',
			method: 'POST',
			data: dishes.value,
		    success: (res) => {
				uni.showToast({
					title: '菜品添加成功',
					duration: 1000
				});
				dishes.value = {};
				files.value = [];
		    }
			
		});
	}
</script>

<style scoped>
	.container {
		margin: auto;
		width: 90%;
	}
</style>